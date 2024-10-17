import { readDocs, createDoc, updateDoc, deleteDoc } from './firestore';

export const reducer = async (state, action) => {
  switch (action.type) {
    // 載入資料
    case 'LOAD':
      let result = await readDocs(state.table);
      console.log(result)
      return {
        ...state,
        data: result,
      };
  }
};
