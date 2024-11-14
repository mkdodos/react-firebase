import {
  readDocs,
  readDocsByStockName,
  updateMaster,
  createDoc,
  updateDoc,
  deleteDoc,
} from './firestore';

export const reducer = async (state, action) => {
  // 資料表名稱
  const table = 'stockDetail';

  // 編輯列
  const row = action.payload?.row;
  const index = action.payload?.index;

  let data = state.data.slice();

  // 計算欄位
  const calColumns = (data) => {
    const newData = data.map((obj) => {
      const { inQty, outQty, price } = obj;

      let amt = 0;

      if (inQty) {
        amt = Math.round(inQty * price);
      } else {
        amt = Math.round(outQty * price);
      }

      return {
        ...obj,
        amt, // 小計
      };
    });
    return newData;
  };

  // 計算合計
  const calTotal = (data) => {
    let sum = 0;
    let inQtys = 0;
    data.map((obj) => {
      sum += obj.amt;
      inQtys += Number(obj.inQty);
    });
    // console.log(sum);
    return {
      amt: sum,
      inQty: inQtys,
    };
  };

  // 執行相關動作
  switch (action.type) {
    // 日期篩選
    case 'FILTER':
      const date = action.payload.date;
      const filteredData = state.data.filter((obj) => obj.transDate == date);

      return {
        ...state,
        data: filteredData,
        total: calTotal(filteredData),
      };

    // 排序
    case 'SORT':
      let direction = 'ascending';
      let sortedData = state.data;
      const columnName = action.payload.column;
      const columnType = action.payload.type;

      if (state.column == columnName) {
        direction = state.direction == 'ascending' ? 'descending' : 'ascending';
        sortedData = state.data.slice().reverse();
      } else {
        direction = 'ascending';
        sortedData = state.data.slice().sort((a, b) => {
          // 數字欄位
          if (columnType == 'number')
            return a[columnName] * 1 > b[columnName] * 1 ? 1 : -1;
          // 其他欄位
          return a[columnName] > b[columnName] ? 1 : -1;
        });
      }

      return {
        ...state,
        data: sortedData,
        column: action.payload.column,
        direction,
      };

    // 載入資料
    case 'LOAD':
      let loadedDocs = [];

      const stockName = state.search.stockName;
      const fromDate = state.search.fromDate;
      // const toDate = state.search.toDate;
      const toDate = state.search.toDate ? state.search.toDate : '';

      // 有傳股票名
      if (stockName) {
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

      const caltedData = calColumns(loadedDocs);
      return {
        ...state,
        data: caltedData,
        total: calTotal(caltedData),
        loading: false,
      };

    // 新增
    case 'ADD':
      return {
        ...state,
        open: true,
        rowIndex: -1,
      };

    // 儲存新增的資料
    case 'CREATE':
      const id = await createDoc(table, row);
      data.unshift({ ...row, id });
      // 更新主表(從 master 找出同名股票且無結束日)
      console.log(await updateMaster(row, 'created'));
      return {
        ...state,
        data: calColumns(data),
        open: false,
        rowIndex: -1,
      };

    // 編輯
    case 'EDIT':
      return { ...state, open: true, rowIndex: index };

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
      await deleteDoc(table, row);
      await updateMaster(row, 'deleted');
      return {
        ...state,
        data: state.data.filter((obj) => obj.id != row.id),
        open: false,
        rowIndex: -1,
      };

    // 關閉表單
    case 'CLOSE':
      return { ...state, open: false };
  }
};
