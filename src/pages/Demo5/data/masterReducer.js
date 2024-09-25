import { readDocs, createDoc, updateDoc, deleteDoc } from '../data/firestore';

export const masterReducer = async (state, action) => {
  switch (action.type) {
    // 載入資料
    case 'LOAD':
      let result = await readDocs(state.table);

      console.log(result);

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
        data,
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
        data: tempRows,
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
