import { readDocs, createDoc, updateDoc, deleteDoc } from '../data/firestore';

export const masterReducer = async (state, action) => {
  switch (action.type) {
    // 載入資料
    case 'LOAD':
      let result = await readDocs('master');

      return { ...state, data: result };

    case 'ADD':
      console.log('ADD');
      const today = new Date().toISOString().substring(0, 10);
      return {
        ...state,
        open: true,
        row: { ...state.defaultRow, transDate: today },
      };
    case 'EDIT':
      const { row, index } = action.payload;
      // console.log(index);
      return { ...state, open: true, row, rowIndex: index };

    case 'CHANGE':
      // console.log(action.payload)
      return {
        ...state,
        row: { ...state.row, [action.payload.name]: action.payload.value },
      };
    case 'CREATE':
      const id = await createDoc('master', state.row);

      let data = state.data.slice();
      data.unshift({ ...state.row, id });

      return {
        ...state,
        data,
        open: false,
        rowIndex: -1,
      };

    case 'UPDATE':
      updateDoc('master', state.row.id, state.row);
      const tempRows = state.data.slice();
      Object.assign(tempRows[state.rowIndex], state.row);
      return {
        ...state,
        open: false,
        data: tempRows,
        rowIndex: -1,
      };

    case 'DELETE':
      deleteDoc('master', state.row.id);
      // setDetailRows(detailRows.filter((obj) => obj.id != state.row.id));
      // const data  = state.data.filter((obj) => obj.id != state.row.id);

      return {
        ...state,
        data: state.data.filter((obj) => obj.id != state.row.id),
        open: false,
        rowIndex: -1,
      };

    case 'CLOSE':
      return { ...state, open: false };
  }
};
