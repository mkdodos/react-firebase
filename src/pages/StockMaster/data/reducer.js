import { readDocs, createDoc, updateDoc, deleteDoc } from './firestore';

export const reducer = async (state, action) => {
  // 資料表名稱
  const table = 'stockMaster';

  // 執行相關動作
  switch (action.type) {
    // 載入資料
    case 'LOAD':
      // const loadedDocs = await readDocs(table);
      return {
        ...state,
        data: await readDocs(table),
        loading: false,
      };
  }
};
