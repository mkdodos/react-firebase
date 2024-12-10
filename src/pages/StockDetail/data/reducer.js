import {
  readDocs,
  createDoc,
  updateDoc,
  deleteDoc,
  readDocsByStockName,
  updateMaster,
  readMaster,
} from './firestore';

export const reducer = async (state, action) => {
  // 資料表名稱
  const table = 'stockDetail';
  // const table = 'test';

  const index = action.payload?.index;
  const row = action.payload?.row;

  let data = state.data.slice();

  // 計算欄位
  const calColumns = (data) => {
    const newData = data.map((obj) => {
      const { inQty, outQty, price } = obj;

      let amt = 0;

      if (inQty) {
        amt = Math.round(inQty * price);
      } else {
        // 賣出金額用負數表示
        amt = Math.round(outQty * price * -1);
      }

      return {
        ...obj,
        amt, // 小計
      };
    });
    return newData;
  };

  // 計算合計
  const calTotal = (data) => {
    let amts = 0; //小計
    let inQtys = 0;
    let outQtys = 0;
    let inAmt = 0; //買入金額
    let outAmt = 0; //賣出金額
    let avgCost = 0; //買入平均單價
    let avgSold = 0; //賣出平均單價
    let sumMinusCost = 0;
    data.map((obj) => {
      let { amt, inQty, outQty, price, minusCost } = obj;
      amts += amt;

      inQtys += Number(inQty);
      outQtys += Number(outQty);
      inAmt += inQty * price;
      outAmt += outQty * price;
      if (!minusCost) minusCost = 0;
      sumMinusCost += minusCost;
    });
    // console.log(sum);
    if (inQtys > 0) {
      avgCost = Math.round((inAmt / inQtys) * 100) / 100;
    }
    if (outQtys > 0) {
      avgSold = Math.round((outAmt / outQtys) * 100) / 100;
    }
    return {
      amt: amts,
      inQty: inQtys,
      outQty: outQtys,
      inAmt,
      outAmt,
      avgCost,
      avgSold,
      minusCost: sumMinusCost,
    };
  };

  // 執行相關動作
  switch (action.type) {
    // 載入資料
    case 'LOAD':
      let loadedDocs = [];

      const stockName = state.search.stockName;
      // 有傳股票名
      if (stockName) {
        const fromDate = state.search.fromDate;
        const toDate = state.search.toDate ? state.search.toDate : '';
        loadedDocs = await readDocsByStockName(
          table,
          stockName,
          fromDate,
          toDate
        );
      }
      // 沒傳股票名
      else {
        loadedDocs = await readDocs(table);
      }

      const caltedData = calColumns(loadedDocs);

      return {
        ...state,
        data: caltedData,
        loading: false,
        total: calTotal(caltedData),
      };

    // 新增
    case 'ADD':
      return {
        ...state,
        open: true,
        rowIndex: -1,
      };

    // 編輯
    case 'EDIT':
      return { ...state, open: true, rowIndex: index };
    // 關閉表單
    case 'CLOSE':
      return { ...state, open: false };

    // 儲存新增的資料
    case 'CREATE':
      // 更新主表前,保存一份主表原資料
      // const masterObj = await readMaster(row.stockName)[0];
      const masterObj = await readMaster(row.stockName);
      row.masterObj = masterObj[0];

      // console.log(masterObj[0])
      // console.log(row.stockName)

      // console.log(await readMaster(row.stockName));

      // 售出時計算單筆損益 =  (主表平均成本 - 單價) * 售出股數
      const { price, outQty } = row;
      if (outQty) {
        const { costs, minusCosts, qtys } = row.masterObj;
        // 每股平均成本
        let avgCost = (costs - minusCosts) / qtys;
        row.bonus = Math.round((price - avgCost) * outQty);

        // 攤提成本
        row.minusCost = Math.round(avgCost * outQty);
      }

      const id = await createDoc(table, row);

      console.log(id);
      data.unshift({ ...row, id });

      // 更新主表(從 master 找出同名股票且無結束日)
      // if(id)
      await updateMaster(row, 'created');
      return {
        ...state,
        data: calColumns(data),
        open: false,
        rowIndex: -1,
        masterObj,
      };

    // 更新
    case 'UPDATE':
      updateDoc(table, row.id, row);
      Object.assign(data[state.rowIndex], row);
      return {
        ...state,
        open: false,
        data: calColumns(data),
        rowIndex: -1,
      };

    // 刪除
    case 'DELETE':
      await deleteDoc(table, row);
      await updateMaster(row, 'deleted');
      return {
        ...state,
        data: state.data.filter((obj) => obj.id != row.id),
        open: false,
        rowIndex: -1,
      };
  }
};
