import { db } from "../../../utils/firebase";
import {
  query,
  limit,
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  getDoc,
  startAfter,
} from "firebase11/firestore/lite";

export const reducer = async (state, action) => {
  // 集合名稱
  const colName = "stock2025";
  // 編輯列
  const row = action.payload?.row;
  const index = action.payload?.index;

  // 計算欄位
  const calColumns = (data) => {
    return data.map((obj) => {
      // 依買進或賣出計算小計
      if (obj.inQty)
        return { ...obj, amt: Math.floor(obj.inQty * obj.price * -1) };
      if (obj.outQty)
        return { ...obj, amt: Math.floor(obj.outQty * obj.price) };
    });
  };

  // 依日期群組
  const groupByDate = (data) => {
    const obj = Object.groupBy(data, ({ date }) => date);
    const arr = [];
    Object.keys(obj).forEach(function (key) {
      let sum = 0;
      let sumQty = 0;
      // key : 日期
      // obj[key] : 該日期的群組資料
      // sum : 金額合計
      obj[key].map((v) => {
        sum += Number(v.amt);
        sumQty += Number(v.inQty);
        sumQty -= Number(v.outQty);
      });
      // obj[key].map((v) => (sum += Number(v.amt)));
      arr.push({ date: key, sum, sumQty, rows: obj[key] });
    });

    return arr;
  };

  const groupByKey = (data, key) => {
    const obj = Object.groupBy(data, (keys) => keys[key]);
    // return obj;
    const arr = [];
    Object.keys(obj).forEach(function (gKey) {
      let sum = 0;
      let sumQty = 0;
      let qty = 0;
      obj[gKey].map((v) => {
        sum += Number(v.amt);
        qty = v.inQty ? v.inQty : v.outQty * -1;        
        sumQty += Number(qty);     
      });
      arr.push({ [key]: gKey, sum, sumQty, rows: obj[gKey] });
    });

    return arr;
  };

  // 依項目群組
  // const groupByItem = (data) => {
  //   const obj = Object.groupBy(data, ({ stockName }) => stockName);
  //   const arr = [];
  //   Object.keys(obj).forEach(function (key) {
  //     let sum = 0;
  //     obj[key].map((v) => (sum += Number(v.amt)));
  //     arr.push({ date: key, sum, rows: obj[key] });
  //   });

  //   return arr;
  // };

  // 執行相關動作
  switch (action.type) {
    // 載入資料
    case "LOAD":
      // 取得集合
      const col = collection(db, colName);
      // 排序,限制筆數
      const q = query(col, orderBy("date", "desc"), limit(100));

      // 資料快照
      const snapshot = await getDocs(q);
      // console.log(snapshot.size)
      // 資料跑迴圈轉成物件陣列
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      const calData = calColumns(data);

      // console.log(groupByKey(calData,'date'))
      // console.log(groupByKey(calData,'stockName'))

      return {
        ...state,
        data: calData,
        // dataByDate: groupByDate(calData),
        dataByDate: groupByKey(calData, "date"),
        // dataByItem: groupByItem(calData),
        dataByItem: groupByKey(calData, "stockName"),
        loading: false,
      };

    // 新增
    case "ADD":
      return {
        ...state,
        open: true,
        rowIndex: -1,
      };

    // 儲存新增的資料
    case "CREATE":
      const docRef = await addDoc(collection(db, colName), {
        ...row,
      });
      // 接收後端傳回的 id , 加入 row 至陣列
      state.data.unshift({ ...row, id: docRef.id });
      // console.log(row)
      // state.data.unshift({ ...row });

      return {
        ...state,
        data: state.data,
        open: false,
        rowIndex: -1,
      };

    // 編輯
    case "EDIT":
      return { ...state, open: true, rowIndex: index };

    // 更新
    case "UPDATE":
      await updateDoc(doc(db, colName, row.id), {
        ...row,
      });
      Object.assign(state.data[state.rowIndex], row);
      return {
        ...state,
        open: false,
        data: state.data,
        rowIndex: -1,
      };

    // 刪除
    case "DELETE":
      const id = action.payload.id;
      await deleteDoc(doc(db, colName, id));
      const dataDel = state.data.filter((obj) => obj.id != id);

      return {
        ...state,
        data: dataDel,
        open: false,
        rowIndex: -1,
      };

    // 關閉表單
    case "CLOSE":
      return { ...state, open: false };
  } // END SWITCH
};
