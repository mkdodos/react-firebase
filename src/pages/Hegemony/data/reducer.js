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

import data from "./db.json";

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
      const col = collection(db, colName);      
      const snapshot = await getDocs(col);     
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      // const total = calTotal(data.stockBonus);

      return {
        ...state,
        // data: calColumns(data.stockBonus),
        // data: data.stockBonus,
        data,
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
      // await deleteDoc(doc(db, colName, id));
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
