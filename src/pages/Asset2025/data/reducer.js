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
  const colName = "asset";
  // 編輯列
  const row = action.payload?.row;
  const index = action.payload?.index;

  // 依日期群組
  const groupByDate = (data) => {
    const obj = Object.groupBy(data, ({ date }) => date);
    const arr = [];
    Object.keys(obj).forEach(function (key) {
      let sum = 0;
      // key : 日期
      // obj[key] : 該日期的群組資料
      // sum : 金額合計
      obj[key].map((v) => (sum += Number(v.amt)));
      arr.push({ date: key, sum, rows: obj[key] });
    });

    return arr;
  };

  // 依項目群組
  const groupByItem = (data) => {
    const obj = Object.groupBy(data, ({ itemName }) => itemName);
    const arr = [];
    Object.keys(obj).forEach(function (key) {
      let sum = 0;
      let sumCost = 0;
      // key : 日期
      // obj[key] : 該日期的群組資料
      // sum : 金額合計
      obj[key].map((v) => (sum += Number(v.amt)));
      arr.push({ date: key, sum, rows: obj[key] });
    });

    return arr;
  };

  // 執行相關動作
  switch (action.type) {
    // 載入資料
    case "LOAD":
      // 取得集合
      const col = collection(db, colName);
      const q = query(col, orderBy("date", "desc"), limit(100));
      // 資料快照
      const snapshot = await getDocs(q);
      // 資料跑迴圈轉成物件陣列
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      return {
        ...state,
        data,
        dataByDate: groupByDate(data),
        dataByItem: groupByItem(data),
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
