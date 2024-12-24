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
          // costs - minusCosts
          Math.round(((costs - minusCosts) / qtys) * 100) / 100;
      }

      // 預估損益
      let bonus = 0;
      bonus = Math.round((price - avgCost) * qtys);
      // 報酬率
      let roi = 0;
      roi = Math.round((bonus / (costs - minusCosts)) * 10000) / 100;
      // 未攤成本
      let leftCosts = 0;
      leftCosts = costs - minusCosts;
      return {
        ...obj,
        qtys: inQtys - outQtys, //餘股
        avgCost,
        costs: Math.round(costs),
        minusCosts: Math.round(minusCosts),
        bonus,
        roi,
        leftCosts,
        leftAmt: Math.round(qtys * price)
      };
    });


    // 預設用損益排序   

    newData.sort((a, b) => {
      return a.bonus < b.bonus ? 1 : -1;
    });

    console.log(newData)

    return newData;
  };


  // 計算合計
  const calTotal = (data) => {
    let bonus = 0; //損益
    // let costs = 0; //成本
    let leftCosts = 0;
    let leftAmt = 0;

    // console.log(data)

    data.map((obj) => {
      bonus += obj.bonus;
      // costs += obj.costs;
      leftCosts+=obj.leftCosts
      leftAmt+=obj.leftAmt
    });

    return {
      bonus,
      // costs,
      leftCosts,
      leftAmt
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
        column: columnName,
        direction,
      };


    // 載入資料
    case 'LOAD':
      const loadedDocs = await readDocs(table);
      const calData = calColumns(loadedDocs)
      return {
        ...state,
        data: calData,
        loading: false,
        total: calTotal(calData),
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
