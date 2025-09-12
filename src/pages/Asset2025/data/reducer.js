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
  const colName = "asset";
  // 編輯列
  const row = action.payload?.row;
  const index = action.payload?.index;

  // 依日期群組(日期排序最新在前)
  const groupByDateDesc = (data1) => {
   
    data1.sort((a, b) => (a.date < b.date ? 1 : -1));

    const obj = Object.groupBy(data1, ({ date }) => date);
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

  // 依日期群組
  const groupByDate = (data1) => {       

    const obj = Object.groupBy(data1, ({ date }) => date);
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

  // 房貸金額
  const mortgage = async () => {
    // 取得集合
    const col = collection(db, "mortgage");
    // const q = query(col, orderBy("date", "desc"), limit(100));
    const q = query(col, orderBy("date"), limit(100));
    // 資料快照
    const snapshot = await getDocs(q);
    // 資料跑迴圈轉成物件陣列
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    // 房貸依日期分組
    const groupedMortgage = Object.groupBy(data, (row) => row.date);
    // 組別陣列
    const groups = Object.keys(groupedMortgage);
    // 組別迴圏
    const arraySum = [];
    groups.map((g) => {
      // 同一日期金額加總
      let sum = 0;
      groupedMortgage[g].map((obj) => (sum += Number(obj.balance)));
      arraySum.push(sum);
    });

    return arraySum;

    // console.log(data);
  };

  // 執行相關動作
  switch (action.type) {
    // 載入資料
    case "LOAD":
      // console.log(await mortgage());
      // 取得集合
      const col = collection(db, colName);
      // const q = query(col, orderBy("date", "desc"), limit(100));
      const q = query(col, orderBy("date"), limit(100));
      // 資料快照
      const snapshot = await getDocs(q);
      // 資料跑迴圈轉成物件陣列
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      // const dataReverse = data.sort((a, b) => (a.date < b.date ? 1 : -1));
      // const dataReverse = data.toSorted((a, b) => (a.date < b.date ? 1 : -1));

      return {
        ...state,
        dataMortgage: await mortgage(),
        data,
        // BarView
        dataBarView: groupByDate(data),
        // CardView
        dataByDate: groupByDateDesc(data),
        // dataByDate: groupByDate(data),
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
