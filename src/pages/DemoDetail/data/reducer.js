import {
  readDocs,
  readDocsByStockName,
  createDoc,
  updateDoc,
  deleteDoc,
} from './firestore';

export const reducer = async (state, action) => {
  const table = state.table;

  // 計算欄位
  const calColumns = (data) => {
    const newData = data.map((obj) => {
      const { inQty, outQty, price } = obj;

      let amt = 0;

      if (inQty) {
        amt = Math.round(inQty * price);
      } else {
        amt = Math.round(outQty * price);
      }

      return {
        ...obj,
        amt, // 小計
      };
    });
    return newData;
  };

  // 計算合計
  const calTotalData = (data) => {
    const totalRow = {
      amt: 0,
      qty: 0,
      inQtys: 0,
      outQtys: 0,
      inAmt: 0,
      outAmt: 0,
    };

    data.map((obj) => {
      if (obj.inQty) {
        totalRow.amt += Number(obj.amt);
      } else {
        totalRow.amt -= Number(obj.amt);
      }
    });

    return totalRow;
  };

  let result = [];

  switch (action.type) {
    case 'FILTER':
      const date = action.payload.value;

      const newData = state.data.filter((obj) => obj.transDate == date);

      return {
        ...state,
        data: newData,
        total: calTotalData(newData),
      };

    // 載入資料

    case 'LOAD_BY_NAME':
      let masterResult = [];
      // 載入主表資料

      masterResult = await readDocsByStockName(
        'master',
        state.search.stockName
      );

      result = await readDocsByStockName(state.table, state.search.stockName);

      result.sort((a, b) => {
        return a.transDate < b.transDate ? 1 : -1;
      });

      return {
        ...state,
        data: calColumns(result),
        masterData: masterResult[0],
      };

    case 'LOAD':
      // console.log('load123');
      result = await readDocs(state.table);

      // result.sort((a, b) => {
      //   return a.transDate < b.transDate ? 1 : -1;
      // });

      return {
        ...state,
        data: calColumns(result),
        masterData: [],
        total: { amt: 0 },
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
      const masterSoldAmt = masterData[0].soldAmt;

      let qtys = 0;
      let amt = 0;
      // 針對買進或賣出做不同處理
      if (createdRow.inQty) {
        console.log('in');

        qtys = Number(masterQtys) + Number(createdRow.inQty);
        // 累加成本
        amt =
          Number(masterCosts) +
          Math.round(Number(createdRow.inQty) * Number(createdRow.price));

        createdRow.qtys = qtys;
        createdRow.inAmt = amt;
        // 更新主表餘股
        updateDoc('master', masterId, { qtys: qtys, costs: amt });
      } else {
        console.log('out');
        qtys = Number(masterQtys) - Number(createdRow.outQty);
        // 累加已售金額
        amt =
          Number(masterSoldAmt) +
          Math.round(Number(createdRow.outQty) * Number(createdRow.price));

        createdRow.qtys = qtys;
        createdRow.outAmt = amt;
        // 更新主表餘股
        updateDoc('master', masterId, { qtys: qtys, soldAmt: amt });
      }

      const id = await createDoc(table, createdRow);
      data.unshift({ ...createdRow, id });

      return {
        ...state,
        data: calColumns(data),
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

      // 針對買進或賣出做主表不同處理

      if (deletedRow.inQty) {
        // 買進
        updateDoc('master', delMasterData[0].id, {
          qtys: Number(delMasterData[0].qtys) - Number(deletedRow.inQty),
          costs:
            Number(delMasterData[0].costs) -
            Math.round(Number(deletedRow.inQty) * Number(deletedRow.price)),
        });
      } else {
        // 賣出
        updateDoc('master', delMasterData[0].id, {
          qtys: Number(delMasterData[0].qtys) + Number(deletedRow.outQty),
          soldAmt:
            Number(delMasterData[0].soldAmt) -
            Math.round(Number(deletedRow.outQty) * Number(deletedRow.price)),
        });
      }

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
