import { readDocs, createDoc, updateDoc, deleteDoc } from '../data/firestore';

const handleCreate = async (row) => {
  const id = await createDoc('master', row);
  return id;
};



export const masterReducer =async  (state, action) => {
  switch (action.type) {
    // 載入資料
    case 'LOAD':
      let result = await readDocs('master');

    // let result = readDocs('master');
      // console.log(result);
      return { ...state, data: result };
    // return { data: [{id:'1', stockName: '長榮' }] };

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
      return { ...state, open: true, row, rowIndex: index };

    case 'CHANGE':
      // console.log(action.payload)
      return {
        ...state,
        row: { ...state.row, [action.payload.name]: action.payload.value },
      };
    case 'CREATE':
      // const id = handleCreate(state.row);

      const id = await createDoc('master', state.row);

      console.log(id);

      return {
        ...state,
        open: false,
        rowIndex: -1,
      };

    case 'UPDATE':
      return {
        ...state,
        open: false,
        // row: action.payload.row,
        rowIndex: -1,
      };

    case 'DELETE':
      return {
        ...state,
        open: false,
        rowIndex: -1,
      };

    case 'CLOSE':
      return { ...state, open: false };
  }
};
