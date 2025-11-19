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
  const colName = "outdoor";
  // 編輯列
  const row = action.payload?.row;
  const index = action.payload?.index;

   // 群組資料
  const groupedData = (data) => {
    const obj = Object.groupBy(data, ({ cate }) => cate);
   
    // 類別
    const cates = Object.keys(obj);
    
    cates.map(cate=>{
     
      console.log(obj[cate])
      
    })

    // 項目
    // const items = obj[cates[0]]; 

    // console.log(Object.keys(obj))
    //  console.log(obj[cates[0]])

    // return arr;
  };


  // 執行相關動作
  switch (action.type) {
    // 載入資料
    case "LOAD":
      // 取得集合
      const col = collection(db, colName);
      // 資料快照
      const snapshot = await getDocs(col);
      // 資料跑迴圈轉成物件陣列
      const list = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      groupedData(list)

      return {
        ...state,
        data: list,
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
