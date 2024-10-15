import {
  readDocs,
  createDoc,
  updateDoc,
  deleteDoc,
  readDocsByStockName,
  readDocsByTransDate,
} from './firestore';

export const reducer = async (state, action) => {
  const table = state.table;

  // 計算欄位
  const genNewData = (data) => {
    const newData = data.map((obj) => {
      const { qty, price } = obj;

      return {
        ...obj,
        amt: Math.round(qty * price),
      };
    });

    return newData;
  };

  // 計算合計
  const genTotalData = (data) => {
    const totalRow = {
      amt: 0,
      qty: 0,
      inQtys: 0,
      outQtys: 0,
      inAmt: 0,
      outAmt: 0,
    };

    data.map((obj) => {
      if (obj.qty > 0) {
        totalRow.inQtys += Number(obj.qty);
        totalRow.inAmt += Number(obj.amt);
      }
      if (obj.qty < 0) {
        totalRow.outQtys += Number(obj.qty * -1);
        totalRow.outAmt += Number(obj.amt * -1);
      }
      totalRow.amt += Number(obj.amt);
      totalRow.qty += Number(obj.qty);
    });

    return totalRow;
  };

  switch (action.type) {
    // 查詢
    case 'SEARCH':
      console.log(action.payload.date);

      let dateResult = await readDocsByTransDate(
        state.table,
        action.payload.date
      );

      return {
        ...state,
        data: genNewData(dateResult),
        total: genTotalData(genNewData(dateResult)),
      };

    // 載入資料
    case 'LOAD':
      // 依有無傳股票名稱取得不同資料
      let result = [];
      if (state.search.stockName) {
        result = await readDocsByStockName(state.table, state.search.stockName);
      } else {
        result = await readDocs(state.table);
      }

      // 日期排序
      result.sort((a, b) => {
        return a.transDate < b.transDate ? 1 : -1;
      });

      const masterData = await readDocsByStockName(
        'master',
        state.search.stockName
      );

      console.log(masterData[0]);

      // , masterRow: { name: 'master' }
      return {
        ...state,
        masterRow: masterData[0],
        data: genNewData(result),
        loading: false,
        total: genTotalData(genNewData(result)),
      };
    // 新增
    case 'ADD':
      return {
        ...state,
        open: true,
        rowIndex: -1,
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

    case 'EDIT':
      const { index } = action.payload;
      return { ...state, open: true, rowIndex: index };

    case 'CHANGE':
      console.log(action.payload);
      return {
        ...state,
        row: { ...state.row, [action.payload.name]: action.payload.value },
      };

    case 'CREATE':
      const createdRow = action.payload.row;
      const isSold = action.payload.isSold;
      if (isSold) createdRow.qty = createdRow.qty * -1;
      const id = await createDoc(table, createdRow);

      let data = state.data.slice();
      data.unshift({ ...createdRow, id });

      const masterRow = state.masterRow;

      masterRow.qtys = Number(masterRow.qtys) + Number(createdRow.qty);
      masterRow.costs = masterRow.costs + createdRow.qty * createdRow.price;

      // console.log(state.masterRow);

      return {
        ...state,
        masterRow,
        data: genNewData(data),
        open: false,
        rowIndex: -1,
      };

    case 'UPDATE':
      const updatedRow = action.payload.row;
      updateDoc(table, updatedRow.id, updatedRow);
      const tempRows = state.data.slice();
      Object.assign(tempRows[state.rowIndex], updatedRow);

      console.log(updatedRow);

      return {
        ...state,
        open: false,
        data: genNewData(tempRows),
        rowIndex: -1,
      };

    case 'DELETE':
      const deletdRow = action.payload.row;
      // console.log(deletdRow);
      deleteDoc(table, deletdRow);

      const afterDeletedRow = state.masterRow;

      afterDeletedRow.costs =
        afterDeletedRow.costs - deletdRow.qty * deletdRow.price;

      return {
        ...state,
        masterRow: afterDeletedRow,
        data: state.data.filter((obj) => obj.id != deletdRow.id),
        open: false,
        rowIndex: -1,
      };

    case 'CLOSE':
      return { ...state, open: false };
  }
};
