import {
  readDocs,
  createDoc,
  updateDoc,
  deleteDoc,
  readDocsByStockName,
} from './firestore';

export const reducer = async (state, action) => {
  // 資料表名稱
  const table = 'stockDetail';

  const index = action.payload?.index;
  const row = action.payload?.row;

  let data = state.data.slice();

  // 計算欄位
  const calColumns = (data) => {
    return data;
  };

  // 執行相關動作
  switch (action.type) {
    // 載入資料
    case 'LOAD':
      let loadedDocs = [];

      const stockName = state.search.stockName;
      // 有傳股票名
      if (stockName) {        
        const fromDate = state.search.fromDate;
        const toDate = state.search.toDate ? state.search.toDate : '';
        loadedDocs = await readDocsByStockName(
          table,
          stockName,
          fromDate,
          toDate
        );
      }
      // 沒傳股票名
      else {
        loadedDocs = await readDocs(table);
      }

      return {
        ...state,
        data: loadedDocs,
        loading: false,
      };

    // 新增
    case 'ADD':
      return {
        ...state,
        open: true,
        rowIndex: -1,
      };

    // 編輯
    case 'EDIT':
      return { ...state, open: true, rowIndex: index };
    // 關閉表單
    case 'CLOSE':
      return { ...state, open: false };

    // 儲存新增的資料
    case 'CREATE':
      const id = await createDoc(table, row);
      data.unshift({ ...row, id });
      return {
        ...state,
        data: calColumns(data),
        open: false,
        rowIndex: -1,
      };

    // 更新
    case 'UPDATE':
      updateDoc(table, row.id, row);
      Object.assign(data[state.rowIndex], row);
      return {
        ...state,
        open: false,
        data: calColumns(data),
        rowIndex: -1,
      };

    // 刪除
    case 'DELETE':
      deleteDoc(table, row);
      return {
        ...state,
        data: state.data.filter((obj) => obj.id != row.id),
        open: false,
        rowIndex: -1,
      };
  }
};
