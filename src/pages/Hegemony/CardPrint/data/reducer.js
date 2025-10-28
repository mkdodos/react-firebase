// import { db } from "../../../../utils/firebase";
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
  startAfter,
} from "firebase11/firestore/lite";

import db from "./db.json";

export const reducer = async (state, action) => {
  // 集合名稱
  const colName = "hegemony";
  // 編輯列
  const row = action.payload?.row;
  const index = action.payload?.index;

  // 計算合計
  const calTotal = (data) => {
    let sum = 0;
    data.map((row) => {
      sum += Number(row.amt);
    });
    return sum;
  };

  // 計算合計
  // const calColumns = (data) => {
  //   return data.map((row) => {
  //     return { ...row, content: "a" };
  //   });
  //   return sum;
  // };

  // 執行相關動作
  switch (action.type) {
    // 載入資料
    case "LOAD":
      // 取得集合
      // const col = collection(db, colName);
      // // 資料快照
      // const snapshot = await getDocs(col);

      // const data = snapshot.docs.map((doc) => {
      //   return { ...doc.data(), id: doc.id };
      // });

      let data = db.hegemony;

     

      // 依傳來的參數做資料篩選
      // const role = "勞工";
      const role = action.className;
      console.log(data)
      // const data = data.hegemony.filter(obj=>obj.class==role)
      // const data = data.hegemony
      if (role !== undefined)
        data = db.hegemony
          .filter((obj) => obj.class == role)
          .sort((a, b) => (a.title > b.title ? 1 : -1));

      // console.log(db.hegemony)

      return {
        ...state,
        // data: data.hegemony,
        // data: data.hegemony.filter(obj=>obj.class==role),
        data,
        // data: filteredData,
        // 複製一份原始資料做文字查詢用
        dataCopy: data,
        loading: false,
      };

    // 文字查詢
    case "TEXT_QUERY":
      const filteredData = state.dataCopy.filter((obj) => {
        // 先將 title 轉成小寫再做查詢,這樣原本是大寫的內容也查的到
        return obj.title.toLowerCase().includes(action.payload.text);
      });

      return { ...state, data: filteredData };

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
      // state.data.unshift({ ...row, id: Date.now() });

      console.log(row);

      return {
        ...state,
        data: state.data,
        total: calTotal(state.data),
        open: false,
        rowIndex: -1,
      };

    // 編輯
    case "EDIT":
      console.log(index);
      return { ...state, open: true, rowIndex: index };

    // 更新
    case "UPDATE":
      await updateDoc(doc(db, colName, row.id), {
        ...row,
      });
      // console.log(row);
      // row.content= row.content.replace(/\r\n|\n/g, "<br>");
      Object.assign(state.data[state.rowIndex], row);
      return {
        ...state,
        open: false,
        data: state.data,
        total: calTotal(state.data),
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
        total: calTotal(dataDel),
        open: false,
        rowIndex: -1,
      };

    // 關閉表單
    case "CLOSE":
      return { ...state, open: false };
  } // END SWITCH
};
