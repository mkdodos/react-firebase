import { loadBundle } from "firebase11/firestore";
import { db } from "./firebase";

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
} from "firebase11/firestore/lite";

export const reducer = async (state, action) => {
  // 集合名稱
  const colName = "stock2025";
  // 編輯列
  const row = action.payload?.row;

  // 計算欄位
  const calColumns = (data) => {
    return data.map((obj) => {
      // 依買進或賣出計算小計
      if (obj.inQty) return { ...obj, amt: Math.floor(obj.inQty * obj.price) };
      if (obj.outQty)
        return { ...obj, amt: Math.floor(obj.outQty * obj.price) };
    });
  };

  // 計算合計
  const calTotal = (data) => {
    let sum = 0;
    data.map((obj) => {
      sum += obj.amt;
    });
    return sum;
  };

  const groupByDateOLD = (data) => {
    const obj = Object.groupBy(data, ({ date }) => date);
    Object.keys(obj).forEach(function (key) {
      // console.log(key, obj[key]);
    });
    return obj;
  };

  const groupByDate = (data) => {
    const obj = Object.groupBy(data, ({ date }) => date);
    const arr = [];

    Object.keys(obj).forEach(function (key) {
      let sum = 0;
      // 日合計
      obj[key].map((v) => (sum += v.amt));
      // 組合資料(日期,日合計,日資料)
      arr.push({ date: key, sum, rows: obj[key] });
    });
    return arr;
  };

  switch (action.type) {
    // 點選表格中欄位做篩選
    case "FILTER":
      let dataFilter = state.dataCopy.filter(
        (obj) =>
          obj[action.payload.column] == action.payload[action.payload.column]
      );
      return { ...state, data: dataFilter, total: calTotal(dataFilter) };

    // 設定查詢
    case "SET_SEARCH":
      return { ...state, search: { ...state.search, ...action.payload } };

    // 查詢
    case "SEARCH":
      let data = state.dataCopy;

      if (state.search.stockNo != "") {
        console.log("stock no");
        data = data.filter((obj) => obj.stockNo == state.search.stockNo);
      }

      if (state.search.date != "") {
        console.log("date");
        data = data.filter((obj) => obj.date == state.search.date);
      }
      console.log(state.search);
      return { ...state, data };
    case "CLEAR_SEARCH":
      // const data = state.data.filter((obj) => obj.stockNo == "2409");
      // console.log(state.search);
      return { ...state, data: state.dataCopy, total: 0 };

    // 載入資料
    case "LOAD":
      // 取得集合
      const citiesCol = collection(db, colName);

      // 查詢
      const q = query(citiesCol, orderBy("date", "desc"), limit(30));
      // const q = query(citiesCol, orderBy('qty'));

      // 資料快照
      const citySnapshot = await getDocs(q);
      // 資料跑迴圈轉成物件陣列
      const cityList = citySnapshot.docs.map((doc) => {
        // return { ...doc.data(), id: doc.id };
        return { ...doc.data() };
      });

      // console.log(cityList);

      // console.log(groupByDate(cityList));

      const calData = calColumns(cityList);

      // console.log(objToArray(calData));

      return {
        ...state,
        data: calData,
        dataCopy: calData,
        dataByDate: groupByDate(calData),
        total: calTotal(calData),
        loading: false,
      };

    // 編輯
    case "EDIT":
      return {
        ...state,
        editedRowIndex: action.payload.editedRowIndex,
        isEditFormOpen: true,
      };

    // 關閉編輯表單
    case "CLOSE_EDITFORM":
      return {
        ...state,
        isEditFormOpen: false,
      };

    // 新增
    case "ADD":
      return {
        ...state,
        editedRowIndex: -1,
        isEditFormOpen: true,
      };

    // 新建
    case "CREATE":
      const docRef = await addDoc(collection(db, colName), {
        ...row,
      });

      console.log(row);
      // 接收後端傳回的 id , 加入 row 至陣列
      state.data.unshift({ ...row, id: docRef.id });
      return {
        ...state,
        data: calColumns(state.data),
        dataCopy: calColumns(state.data),
        isEditFormOpen: false,
        editedRowIndex: -1,
      };

    // 更新
    case "UPDATE":
      // const washingtonRef = doc(db, collection, docID);
      const washingtonRef = doc(db, colName, row.id);
      await updateDoc(washingtonRef, {
        ...row,
      });

      Object.assign(state.data[state.editedRowIndex], row);

      return {
        ...state,
        isEditFormOpen: false,
        editedRowIndex: -1,
        data: calColumns(state.data),
        dataCopy: calColumns(state.data),
      };

    // 刪除
    case "DELETE":
      const id = action.payload.id;
      await deleteDoc(doc(db, colName, id));
      // console.log(id)
      return {
        ...state,
        data: state.data.filter((obj) => obj.id != id),
        dataCopy: state.dataCopy.filter((obj) => obj.id != id),
        isEditFormOpen: false,
        editedRowIndex: -1,
      };
  }
};
