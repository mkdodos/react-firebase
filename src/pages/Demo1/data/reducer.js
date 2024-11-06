import { readDocs } from './firestore';

export const reducer = async (state, action) => {
  // 資料表名稱
  const table = state.table;

  // 執行相關動作
  switch (action.type) {
    // 載入資料
    case 'LOAD':
      return {
        ...state,
        data: await readDocs(table),
        loading:false
      };
  }
};
