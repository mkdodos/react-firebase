import { da } from "@faker-js/faker";
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
  const colName = "mortgage";
  // 編輯列
  const row = action.payload?.row;
  const index = action.payload?.index;

  // 依鍵值群組資料並轉為所需陣列
  const groupByKey = (data, key) => {
    console.log(data);
    // 原始資料
    // [
    //   {
    //     date: "2025-08-09",
    //     amt: "9",
    //   },
    //   {
    //     date: "2025-09-09",
    //     amt: "500",
    //   },
    //   {
    //     date: "2025-09-09",
    //     amt: "18000",
    //   }
    // ];
    //keys : 所有鍵 , keys[key] : 指定鍵
    const obj = Object.groupBy(data, (keys) => keys[key]);
    console.log(obj);
    // 以日期為鍵值,將同一日期的資料群組為陣列
    //  {
    //     "2025-08-09": [
    //         { "amt": "9"}
    //     ],
    //     "2025-09-09": [
    //         {  "amt": "500"},
    //         {  "amt": "18000"}
    //     ]
    //  }

    console.log(Object.keys(obj));
    // 將物件的鍵值轉為陣列
    // [
    //     "2025-08-09",
    //     "2025-09-09"
    // ]

    const arr = [];
    // 轉為陣列
    Object.keys(obj).forEach(function (gKey) {
      // gKey : 日期
      let sumAmt = 0;
      let sumBalance = 0;

      // 該日期的資料
      obj[gKey].map((v) => {
        // 加總金額
        sumAmt += Number(v.amt);
        // 加總餘額
        sumBalance += Number(v.balance);
      });
      // 每一個日期的資料加入陣列(日期,金額,餘額,資料)
      arr.push({ [key]: gKey, sumAmt, sumBalance, rows: obj[gKey] });
    });

    return arr;
  };

  // 執行相關動作
  switch (action.type) {
    // 載入資料
    case "LOAD":
      // 取得集合
      const col = collection(db, colName);
      // 資料快照
      // 依日期排序,最新在前
      const q = query(col, orderBy("date", "desc"), limit(30));
      const snapshot = await getDocs(q);
      // 資料跑迴圈轉成物件陣列
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      // 資料分組
      const groupData = Object.groupBy(data,(row)=>row.item);
      // console.log(groupData['60'])
      // console.log(groupData['500'])
      // 取得第一筆資料的餘額
      // const balance = list[0].balance;
      // console.log(balance)
      // console.log(groupByKey(list, "date"));

      return {
        ...state,
        data,
        groupData,
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
