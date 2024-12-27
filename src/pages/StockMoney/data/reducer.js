import {
  readDocs,
  readDocsByDate,
  createDoc,
  updateDoc,
  deleteDoc,
  readAndCreate,
} from './firestore';

export const reducer = async (state, action) => {
  // 資料表名稱
  const table = 'balances';

  // 編輯列
  const row = action.payload?.row;
  const index = action.payload?.index;

  let data = state.data.slice();



  // 計算合計
  const calTotal = (data) => {
    let income = 0;
    let expense = 0;

    data.map((obj) => {
      if(obj.income)
      income +=Number(obj.income);
      if(obj.expense)
      expense += Number(obj.expense);
    });

    return {
      income,
      expense
    };
  };


  // 執行相關動作
  switch (action.type) {
    // 查詢資料
    case "QUERY":
      // 取得開始日期
      const fromDate = action.payload.fromDate;
      const toDate = action.payload.toDate;
      const queryDocs = await readDocsByDate(table, fromDate, toDate)
      return {
        ...state,
        data: queryDocs,
        total: calTotal(queryDocs)
      }
    // 載入資料
    case 'LOAD':
      const docs = await readDocs(table)
      return {
        ...state,
        data: docs,
        loading: false,
        total: calTotal(docs)
      };

    // 新增
    case 'ADD':
      // readAndCreate()
      return {
        ...state,
        open: true,
        rowIndex: -1,
      };

    // 儲存新增的資料
    case 'CREATE':
      row.cate = '存股';
      const id = await createDoc(table, row);
      data.unshift({ ...row, id });
      return {
        ...state,
        data,
        open: false,
        rowIndex: -1,
      };

    // 編輯
    case 'EDIT':
      return { ...state, open: true, rowIndex: index };

    // 更新
    case 'UPDATE':
      updateDoc(table, row.id, row);
      Object.assign(data[state.rowIndex], row);
      return {
        ...state,
        open: false,
        data: data,
        rowIndex: -1,
      };

    // 刪除
    case 'DELETE':
      deleteDoc(table, row);
      return {
        ...state,
        data: state.data.filter((obj) => obj.id != row.id),
        open: false,
        rowIndex: -1,
      };

    // 關閉表單
    case 'CLOSE':
      return { ...state, open: false };
  }
};
