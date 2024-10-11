import { readDocs, createDoc, updateDoc, deleteDoc } from './firestore';

export const masterReducer = async (state, action) => {
  // 計算欄位
  const genNewData = (data) => {
    const newData = data.map((obj) => {
      const { qtys, price, costs } = obj;

      obj.costs = Math.round(obj.costs);

      return {
        ...obj,
        amt: Math.round(qtys * price), // 總市值
        avgCost: Math.round((costs / qtys) * 100) / 100, //平均成本
        bonus: Math.round(qtys * price - costs), //損益
        roi: Math.round(((qtys * price - costs) / costs) * 10000) / 100, //報酬率
      };
    });

    return newData;
  };

  // 計算合計
  const genTotalData = (data) => {
    const totalRow = { costs: 0, bonus: 0, amt: 0 };

    data.map((obj) => {
      totalRow.costs += Number(obj.costs);
      totalRow.bonus += Number(obj.bonus);
      totalRow.amt += Number(obj.amt);
    });

    totalRow.costs = Math.round(totalRow.costs);
    totalRow.roi = Math.round((totalRow.bonus / totalRow.costs) * 10000) / 100;
    return totalRow;
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
      let result = await readDocs(state.table);

      

      return {
        ...state,
        data: genNewData(result),
        loading: false,
        // total: { qtys: 100, costs: 200,bonus:300 },
        total: genTotalData(genNewData(result)),
      };

    case 'ADD':
      return {
        ...state,
        open: true,
        rowIndex: -1,
        row: { ...state.defaultRow },
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
      const id = await createDoc('master', createdRow);

      let data = state.data.slice();
      data.unshift({ ...createdRow, id });

      return {
        ...state,
        data: genNewData(data),
        open: false,
        rowIndex: -1,
      };

    case 'UPDATE':
      const updatedRow = action.payload.row;
      updateDoc('master', updatedRow.id, updatedRow);
      const tempRows = state.data.slice();
      Object.assign(tempRows[state.rowIndex], updatedRow);

      return {
        ...state,
        open: false,
        data: genNewData(tempRows),
        rowIndex: -1,
      };

    case 'DELETE':
      const deletdRow = action.payload.row;
      console.log(deletdRow);
      deleteDoc('master', deletdRow.id);

      return {
        ...state,
        data: state.data.filter((obj) => obj.id != deletdRow.id),
        open: false,
        rowIndex: -1,
      };

    case 'CLOSE':
      return { ...state, open: false };
  }
};
