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
  getDoc,
} from "firebase11/firestore/lite";

export const reducer = async (state, action) => {
  const colName = "stock2025";
  const row = action.payload?.row;
  switch (action.type) {
    case "LOAD":
      // const colName = "mealsEmp";
      // 取得集合
      const citiesCol = collection(db, colName);

      // 限制筆數
      const q = query(citiesCol, limit(3));

      // 資料快照
      const citySnapshot = await getDocs(q);
      // 資料跑迴圈轉成物件陣列
      const cityList = citySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      //   const docRef = doc(db, "test", "5HqsFcpweEF0EPulmI5M");
      //   const docSnap = await getDoc(docRef);
      //   console.log(docSnap.data());

      return { data: cityList };

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
        ...row
      });

      console.log(row)
      // 接收後端傳回的 id , 加入 row 至陣列
      state.data.unshift({ ...row, id: docRef.id });
      return {
        ...state,
        isEditFormOpen: false,
        editedRowIndex: -1,
      };

    // 更新
    case "UPDATE":
      Object.assign(state.data[state.editedRowIndex], row);
      // const washingtonRef = doc(db, collection, docID);
      const washingtonRef = doc(db, colName, row.id);
      await updateDoc(washingtonRef, {
        ...row
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
