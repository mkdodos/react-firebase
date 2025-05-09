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
      return { ...obj, amt: Math.floor(obj.qty * obj.price) };
    });
  };

  switch (action.type) {
    case "FILTER":
      // let dataFilter = state.dataCopy;

      let dataFilter = state.dataCopy.filter(
        (obj) =>
          obj[action.payload.column] == action.payload[action.payload.column]
      );

      // console.log(action.payload);
      return { ...state, data: dataFilter };

    case "SET_SEARCH":
      return { ...state, search: { ...state.search, ...action.payload } };

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
      return { ...state, data: state.dataCopy };
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
        return { ...doc.data(), id: doc.id };
      });

      console.log(cityList);

      return {
        ...state,
        data: calColumns(cityList),
        dataCopy: calColumns(cityList),
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
        isEditFormOpen: false,
        editedRowIndex: -1,
      };

    // 更新
    case "UPDATE":
      Object.assign(state.data[state.editedRowIndex], row);
      // const washingtonRef = doc(db, collection, docID);
      const washingtonRef = doc(db, colName, row.id);
      await updateDoc(washingtonRef, {
        ...row,
      });

      return {
        ...state,
        isEditFormOpen: false,
        editedRowIndex: -1,
      };

    // 刪除
    case "DELETE":
      const id = action.payload.id;
      await deleteDoc(doc(db, colName, id));
      // console.log(id)
      return {
        ...state,
        data: state.data.filter((obj) => obj.id != id),
        isEditFormOpen: false,
        editedRowIndex: -1,
      };
  }
};
