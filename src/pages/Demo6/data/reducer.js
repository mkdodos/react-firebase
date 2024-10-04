import { readDocs, createDoc, updateDoc, deleteDoc } from './firestore';

export const reducer = async (state, action) => {
  const table = state.table;

  // 計算欄位
  const genNewData = (data) => {
    const newData = data.map((obj) => {
      const { qty, price } = obj;

      // const totalRow =

      return {
        ...obj,
        amt: Math.round(qty * price),
      };
    });

    return newData;
  };

  // 計算合計
  const genTotalData = (data) => {
    const totalRow = { amt: 0 };

    data.map((obj) => {
      totalRow.amt += Number(obj.amt);
    });

    return totalRow;

    // return {
    //   amt: totalRow.amt,
    // };
  };

  switch (action.type) {
    // 載入資料
    case 'LOAD':
      let result = await readDocs(state.table);
      // console.log(result);
      return {
        ...state,
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

      if (state.column == columnName) {
        direction = state.direction == 'ascending' ? 'descending' : 'ascending';
        sortedData = state.data.slice().reverse();
      } else {
        direction = 'ascending';
        sortedData = state.data.slice().sort((a, b) => {
          return a[columnName] * 1 > b[columnName] * 1 ? 1 : -1;
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
      const id = await createDoc(table, createdRow);

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
      console.log(deletdRow);
      deleteDoc(table, deletdRow.id);

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
