import {
  readDocs,
  createDoc,
  updateDoc,
  deleteDoc,
  readDetailRowCounts,
} from './firestore';
import { readDocsByStockName } from '../../StockDetail/data/firestore';

export const reducer = async (state, action) => {
  // 資料表名稱
  const table = 'stockMaster';

  // 編輯列
  const row = action.payload?.row;
  const index = action.payload?.index;

  let data = state.data.slice();

  // 計算欄位
  const calColumns = (data) => {
    let newData = data.map((obj) => {
      const { qtys, price, costs, outQtys, soldAmt, stockName, fromDate } = obj;
      obj.costs = Math.round(obj.costs);
      //損益平衡價(成本-已售金額)/餘股
      // let avgCost = 0;
      // if (qtys > 0) {
      //   avgCost = Math.round(((costs - soldAmt) / qtys) * 100) / 100;
      // }
      // 依是否全部售完做不同損益計算

      // 平均買價
      // 平均賣價
      let avgCost = 0;
      let avgSold = 0;

      let bonus = 0;
      // 沒有餘股時,損益 = 已售金額 - 成本
      if (qtys == 0) {
        bonus = soldAmt - costs;
      } else {
        bonus = Math.round((price - avgCost) * qtys);
      }

      return {
        ...obj,
        amt: Math.round(qtys * price), // 總市值
        avgCost, // 平均買價
        avgSold, // 平均賣價
        bonus,
        roi: Math.round((bonus / costs) * 10000) / 100,
        leftQtys: qtys - outQtys,
      };
    });

    // 預設用損益排序
    newData = newData.sort((a, b) => {
      return a.bonus < b.bonus ? 1 : -1;
    });

    return newData;
  };

  // 計算合計
  const calTotal = (data) => {
    let bonus = 0; //損益
    let costs = 0; //成本

    data.map((obj) => {
      bonus += obj.bonus;
      costs += obj.costs;
    });

    return {
      bonus,
      costs,
    };
  };

  // 執行相關動作
  switch (action.type) {
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
      const loadedDocs = calColumns(await readDocs(table));

      return {
        ...state,
        data: loadedDocs,
        total: calTotal(loadedDocs),
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
        data: calColumns(data),
        open: false,
        rowIndex: -1,
      };

    // 編輯
    case 'EDIT':
      // console.log(state)
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
