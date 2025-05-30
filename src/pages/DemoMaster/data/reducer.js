import {
  readDocs,
  readDocsNotEnd,
  readDocsEnd,
  createDoc,
  updateDoc,
  deleteDoc,
} from './firestore';

export const reducer = async (state, action) => {
  const table = state.table;

  // 計算欄位
  const calColumns = (data) => {
    const newData = data.map((obj) => {
      const { qtys, price, costs, outQtys, soldAmt } = obj;
      obj.costs = Math.round(obj.costs);

      let avgCost = 0;

      if (qtys > 0) {
        avgCost = Math.round(((costs - soldAmt) / qtys) * 100) / 100; //損益平衡價
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
        //
        // bonus: Math.round(qtys * price - costs), //損益
        roi: Math.round((bonus / costs) * 10000) / 100,
        // roi: Math.round(((qtys * price - costs) / costs) * 10000) / 100, //報酬率
        leftQtys: qtys - outQtys,
      };
    });
    return newData;
  };

  // 計算合計
  const calTotal = (data) => {
    // const { bonus } = data;
    let sum = 0;
    data.map((obj) => {
      return (sum += Number(obj.bonus));
    });
    return sum;
  };

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
      // let result = await readDocs(table);
      let result = await readDocsNotEnd(table);

      // console.log(result);

      return {
        ...state,
        data: calColumns(result),
        loading: false,
        total: { bonus: calTotal(calColumns(result)) },
       
      };

    // 載入資料
    case 'LOAD_END':
      // let result = await readDocs(table);
      // let result = await readDocsEnd(table);

      return {
        ...state,
        data: calColumns(await readDocsEnd(table)),
        loading: false,
      };

    // 載入資料
    case 'LOAD_NOT_END':
      // let result = await readDocs(table);
      // let result = await readDocsEnd(table);

      return {
        ...state,
        data: calColumns(await readDocsNotEnd(table)),
        loading: false,
      };

    // 新增
    case 'ADD':
      return {
        ...state,
        open: true,
        rowIndex: -1,
      };

    case 'CREATE':
      const createdRow = action.payload.row;
      let data = state.data.slice();

      const id = await createDoc(table, createdRow);
      data.unshift({ ...createdRow, id });

      return {
        ...state,
        data,
        open: false,
        rowIndex: -1,
      };

    // 編輯
    case 'EDIT':
      const { index } = action.payload;
      console.log(state);
      return { ...state, open: true, rowIndex: index };

    // 更新
    case 'UPDATE':
      const updatedRow = action.payload.row;
      updateDoc(table, updatedRow.id, updatedRow);
      const tempRows = state.data.slice();
      Object.assign(tempRows[state.rowIndex], updatedRow);

      return {
        ...state,
        open: false,
        data: calColumns(tempRows),
        rowIndex: -1,
      };

    // 刪除
    case 'DELETE':
      const deletdRow = action.payload.row;
      console.log('de');
      deleteDoc(table, deletdRow);

      return {
        ...state,
        data: state.data.filter((obj) => obj.id != deletdRow.id),
        open: false,
        rowIndex: -1,
      };

    // 關閉表單
    case 'CLOSE':
      return { ...state, open: false };
  }
};
