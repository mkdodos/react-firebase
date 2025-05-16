import { db } from "../../../utils/firebase";
import { db2 } from "../../../utils/firebase";


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
  const colName = "stock2025";
  // 編輯列
  const row = action.payload?.row;

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
    let sum = 0;
    data.map((obj) => {
      sum += obj.amt;
    });
    return sum;
  };

  const groupByDate = (data) => {
    const obj = Object.groupBy(data, ({ date }) => date);
    const arr = [];

    Object.keys(obj).forEach(function (key) {
      let sum = 0;
      // 日合計
      // obj[key].map((v) => (v.inQty ? (sum -= v.amt) : (sum += v.amt)));
      obj[key].map((v) => (sum += v.amt));
      // 組合資料(日期,日合計,日資料)
      arr.push({ date: key, sum, rows: obj[key] });
    });
    return arr;
  };

  const groupByStock = (data) => {
    const obj = Object.groupBy(data, ({ stockName }) => stockName);
    const arr = [];

    Object.keys(obj).forEach(function (key) {
      let sum = 0;
      let qtys = 0;
      let qty = 0;
      //
      obj[key].map((v) => {
        sum += v.amt;

        qty = v.inQty ? v.inQty : v.outQty * -1;

        // qtys += Number(v.inQty) -Number(v.outQty);
        // qtys += Number(v.outQty);
        qtys += Number(qty);
      });
      // 組合資料(股票,股數,日合計,日資料)
      arr.push({ stockName: key, sum, qtys, rows: obj[key] });
    });
    return arr;
  };

  // 資料分頁
  const getNextDocs = async (lastVisible) => {
    const next = query(
      col,
      orderBy("date", "desc"),
      startAfter(lastVisible),
      limit(3)
    );

    const snapshot = await getDocs(next);

    // 資料跑迴圈轉成物件陣列
    const list = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    const lastDoc = snapshot.docs[snapshot.docs.length - 1];

    // 傳回分頁資料和最後一筆指標
    return { list, lastDoc };
  };

  // 取得集合
  const col = collection(db, colName);

  switch (action.type) {
    // 取得下拉股票資料
    case "LOAD_STOCK_OPTIONS":
      // const colStockBasic = collection(db2, "stockBasic");

      // // 資料快照
      // const snapshotBasic = await getDocs(colStockBasic);

      // // 資料跑迴圈轉成物件陣列
      // const listBasic = snapshotBasic.docs.map((doc) => {
      //   const { stockName, stockNo } = doc.data();
      //   return {
      //     key: stockNo,
      //     text: stockNo + " " + stockName,
      //     value: stockNo,
      //   };

      //   // return { ...doc.data(), id: doc.id };
      // });

      // console.log(listBasic);
      return { ...state, options: listBasic };

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
      // 查詢
      const q = query(col, orderBy("date", "desc"), limit(30));

      // 資料快照
      const snapshot = await getDocs(q);

      const lastVisible = snapshot.docs[snapshot.docs.length - 1];

      // 資料跑迴圈轉成物件陣列
      const list = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
        // return { ...doc.data() };
      });

      // const calData = calColumns(list);
      const calData = calColumns(list);

      const colStockBasic = collection(db2, "stockBasic");

      // 資料快照
      const snapshotBasic = await getDocs(colStockBasic);

      // 資料跑迴圈轉成物件陣列
      const listBasic = snapshotBasic.docs.map((doc) => {
        const { stockName, stockNo } = doc.data();
        return {
          key: stockNo,
          text: stockNo + " " + stockName,
          value: stockNo,
        };

        // return { ...doc.data(), id: doc.id };
      });

      console.log(listBasic);

      const openedData = calData.filter((obj) => !obj.isClosed);
      const closedData = calData.filter((obj) => obj.isClosed);

      return {
        ...state,
        data: calData,
        dataCopy: calData,
        dataByDate: groupByDate(calData),
        dataByStock: groupByStock(openedData),
        // 封存資料(isClosed)
        dataByStockClosed: groupByStock(closedData),
        total: calTotal(calData),
        loading: false,
        lastVisible,
        options: listBasic,
      };

    // 下一頁
    case "NEXT_PAGE":
      // 取得下個分頁資料
      let nextDocs = await getNextDocs(state.lastVisible);
      console.log(nextDocs);
      // 再下個分頁資料
      // if (nextDocs.lastDoc) {
      //   nextDocs = await getNextDocs(nextDocs.lastDoc);
      //   console.log(nextDocs);
      // }
      // ...

      return {
        ...state,
        lastVisible: nextDocs.lastDoc,
        data: state.data.concat(calColumns(nextDocs.list)),
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
        dataByDate: groupByDate(calColumns(state.data)),
        dataByStock: groupByStock(calColumns(state.data)),
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
      const dataDel = state.data.filter((obj) => obj.id != id);
      return {
        ...state,
        data: dataDel,
        dataCopy: state.dataCopy.filter((obj) => obj.id != id),
        dataByDate: groupByDate(calColumns(dataDel)),
        dataByStock: groupByStock(calColumns(dataDel)),
        isEditFormOpen: false,
        editedRowIndex: -1,
      };
  }
};
