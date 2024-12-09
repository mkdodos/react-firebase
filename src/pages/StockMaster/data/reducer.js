import { readDocs, createDoc, updateDoc, deleteDoc } from './firestore';

export const reducer = async (state, action) => {
  // 資料表名稱
  const table = 'stockMaster';

  const index = action.payload?.index;
  const row = action.payload?.row;

  let data = state.data.slice();

  // 計算欄位
  const calColumns = (data) => {
    let newData = data.map((obj) => {
      const { qtys, price, costs, soldAmt, inQtys, outQtys, minusCosts } = obj;

      //平均成本(有成本和股數時才做計算)
      let avgCost = 0;
      // if (costs > 0 && inQtys > 0) {
      if (qtys > 0) {
        avgCost =
          Math.round(((costs - minusCosts) / qtys) * 100) / 100;
      }
      return {
        ...obj,
        qtys: inQtys - outQtys, //餘股
        avgCost,
        costs: Math.round(costs),
        minusCosts: Math.round(minusCosts),
      };
    });

    return newData;
  };

  // 執行相關動作
  switch (action.type) {
    // 載入資料
    case 'LOAD':
      const loadedDocs = await readDocs(table);
      return {
        ...state,
        data: calColumns(loadedDocs),
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
