import {
  readDocs,
  readDocsByStockName,
  createDoc,
  updateDoc,
  deleteDoc,
} from './firestore';

export const reducer = async (state, action) => {
  const table = state.table;

  switch (action.type) {
    // 載入資料
    case 'LOAD':
      let result = [];

      if (state.search.stockName) {
        result = await readDocsByStockName(state.table, state.search.stockName);
      } else {
        result = await readDocs(state.table);
      }

      result.sort((a, b) => {
        return a.transDate < b.transDate ? 1 : -1;
      });

      return {
        ...state,
        data: result,
      };

    // 新增
    case 'ADD':
      return {
        ...state,
        open: true,
        rowIndex: -1,
      };

    case 'CREATE':
      const createdRow = action.payload.row;
      let data = state.data.slice();

      // 主表資料
      let masterData = await readDocsByStockName(
        'master',
        createdRow.stockName
      );
      const masterId = masterData[0].id;
      const masterQtys = masterData[0].qtys;
      const masterCosts = masterData[0].costs;
      const qtys = Number(masterQtys) + Number(createdRow.inQty);
      // 累加成本
      const costs =
        Number(masterCosts) +
        Number(createdRow.inQty) * Number(createdRow.price);

      createdRow.qtys = qtys;
      createdRow.inAmt = costs;
      const id = await createDoc(table, createdRow);
      data.unshift({ ...createdRow, id });

      // 更新主表餘股
      updateDoc('master', masterId, { qtys: qtys, costs: costs });

      return {
        ...state,
        data,
        open: false,
        rowIndex: -1,
      };

    // 編輯
    case 'EDIT':
      const { index } = action.payload;
      return { ...state, open: true, rowIndex: index };

    // 更新
    case 'UPDATE':
      const updatedRow = action.payload.row;
      updateDoc(table, updatedRow.id, updatedRow);
      const tempRows = state.data.slice();
      Object.assign(tempRows[state.rowIndex], updatedRow);

      return {
        ...state,
        open: false,
        data: tempRows,
        rowIndex: -1,
      };

    // 刪除
    case 'DELETE':
      console.log('de');
      const deletedRow = action.payload.row;
      deleteDoc(table, deletedRow);

      // 主表資料
      let delMasterData = await readDocsByStockName(
        'master',
        deletedRow.stockName
      );

      // 更新主表
      updateDoc('master', delMasterData[0].id, {
        qtys: Number(delMasterData[0].qtys) - Number(deletedRow.inQty),
        costs:
          Number(delMasterData[0].costs) -
          Number(deletedRow.inQty) * Number(deletedRow.price),
      });

      return {
        ...state,
        data: state.data.filter((obj) => obj.id != deletedRow.id),
        open: false,
        rowIndex: -1,
      };

    // 關閉表單
    case 'CLOSE':
      return { ...state, open: false };
  }
};
