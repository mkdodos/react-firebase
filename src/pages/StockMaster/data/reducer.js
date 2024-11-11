import { readDocs, createDoc, updateDoc, deleteDoc } from './firestore';

export const reducer = async (state, action) => {
  // 資料表名稱
  const table = 'stockMaster';

  // 編輯列
  const row = action.payload?.row;
  const index = action.payload?.index;

  let data = state.data.slice();

  // 計算欄位

  const calColumns = (data) => {
    const newData = data.map((obj) => {
      const { qtys, price, costs, outQtys, soldAmt } = obj;
      obj.costs = Math.round(obj.costs);
      //損益平衡價(成本-已售金額)/餘股
      let avgCost = 0;
      if (qtys > 0) {
        avgCost = Math.round(((costs - soldAmt) / qtys) * 100) / 100; 
      }
      // 依是否全部售完做不同損益計算
      let bonus = 0;
      if (qtys == 0) {
        bonus = soldAmt - costs;
      } else {
        bonus = Math.round((price - avgCost) * qtys);
      }

      return {
        ...obj,
        amt: Math.round(qtys * price), // 總市值
        avgCost,
        bonus,
        roi: Math.round((bonus / costs) * 10000) / 100,
        leftQtys: qtys - outQtys,
      };
    });
    return newData;
  };

  // 執行相關動作
  switch (action.type) {
    // 載入資料
    case 'LOAD':
      return {
        ...state,
        data: calColumns(await readDocs(table)),
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
      return {
        ...state,
        data:calColumns(data),
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
      deleteDoc(table, row);
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
