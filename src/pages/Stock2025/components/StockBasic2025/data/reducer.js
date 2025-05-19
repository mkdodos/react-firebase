// import { readDocs } from './firestore';

import { db } from "../../../../../utils/firebase";


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
  // 資料表名稱
  const table = state.table;

  // 執行相關動作
  switch (action.type) {
    // 載入資料
    case "LOAD":
      // 取得集合
      const col = collection(db, "stockBasic");
      // 資料快照
      const snapshot = await getDocs(col);
      // 資料跑迴圈轉成物件陣列
      const list = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log(list)
      return {
        ...state,
        data: list,
      };
  }
};
