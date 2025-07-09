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
  where,
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

  // 計算合計
  const calTotal = (data) => {
    let sumInAmt = 0;
    let sumOutAmt = 0;
    // 買入賣出分別計算
    data.map((obj) => {
      if (obj.inQty) sumInAmt += Math.round(obj.inQty * obj.price);
      if (obj.outQty) sumOutAmt += Math.round(obj.outQty * obj.price);
    });
    return { sumInAmt, sumOutAmt, sumAmt: sumInAmt - sumOutAmt };
  };

  // 依鍵值群組資料並轉為所需陣列
  const groupByKey = (data, key) => {
    //keys : 所有鍵 , keys[key] : 指定鍵
    const obj = Object.groupBy(data, (keys) => keys[key]);
    const arr = [];
    // 轉為陣列
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

  const groupedYM = (data) => {
    const arr = [];
    const grouped = Object.groupBy(data, (item) => {
      const d = new Date(item.date);
      // 以年月分組
      return d.getFullYear() + "-0" + (d.getMonth() + 1);
    });
    // console.log(grouped);

    Object.keys(grouped).forEach(function (gKey) {
      let sum = 0;
      // 年月群組資料
      grouped[gKey].map((row) => {
        sum += Number(row.amt);
      });
      arr.push({ ym: gKey, sum });
    });
    return arr;
    // console.log(arr);
  };

  // 執行相關動作
  switch (action.type) {
    case "SET_SEARCH":
      return {
        ...state,
        search: {
          ...state.search,
          year: action.payload.year,
          month: action.payload.month,
        },
      };
    // 封存
    case "ARCHIVE":
      // 多筆更新
      const rows = action.payload.rows;
      rows.map(async (row) => {
        await updateDoc(doc(db, colName, row.id), {
          isClosed: true,
        });
      });
      return state;
    // 載入資料
    case "LOAD":
      // 取得集合
      const col = collection(db, colName);

      // 用下拉年月組合日期查詢
      // const dateFrom = state.search?.year + "-" + state.search?.month + "-01";
      // const dateTo = state.search?.year + "-" + state.search?.month + "-31";
      // const dateFrom = state.search?.year + "-" + "01-01";
      // const dateTo = state.search?.year + "-" + "12-31";

      let dateFrom = "";
      let dateTo = "";

      // 沒輸入月份查整年
      if (state.search.month == "") {
        dateFrom = state.search?.year + "-" + "01-01";
        dateTo = state.search?.year + "-" + "12-31";
      } else {
        // 有輸入月份查該月
        dateFrom = state.search?.year + "-" + state.search?.month + "-01";
        dateTo = state.search?.year + "-" + state.search?.month + "-31";
      }

      const q = query(
        col,
        where("date", ">=", dateFrom),
        where("date", "<=", dateTo),
        orderBy("date", "desc"),
        limit(200)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      const calData = calColumns(data);

      const groupedAmtByYM = groupedYM(calData);

      const openedData = calData.filter((obj) => !obj.isClosed);
      const closedData = calData.filter((obj) => obj.isClosed);

      return {
        ...state,
        data: calData,
        dataByDate: groupByKey(calData, "date"),
        dataByItem: groupByKey(openedData, "stockName"),
        dataByItemClosed: groupByKey(closedData, "stockName"),
        dataGroupedYM: groupedAmtByYM,
        total: calTotal(calData),
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
