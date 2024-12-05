import { db } from '../../../utils/firebase';

const readDocs = async (table) => {
  const snapshot = await db.collection(table).limit(10).get();
  // const snapshot = await db
  //   .collection(table)
  //   .where('stockName', '==', '測試')
  //   .limit(10)
  //   .get();
  let data = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return data;
};

const readDocsByStockName = async (table, stockName, fromDate, toDate) => {
  let snapshot = db.collection(table).where('stockName', '==', stockName);

  snapshot = snapshot.where('transDate', '>=', fromDate);

  if (toDate) snapshot = snapshot.where('transDate', '<=', toDate);

  snapshot = await snapshot.orderBy('transDate', 'desc').get();

  const data = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return data;
};

const createDoc = async (table, row) => {
  console.log(row);
  const docRef = await db.collection(table).add(row);
  return docRef.id;
};

// 更新主表
const updateMaster = async (row, op) => {
  // 傳來的明細值
  const { stockName, inQty, outQty, price } = row;
  // 主表列
  const snapshot = await db
    .collection('stockMaster')
    .where('stockName', '==', stockName)
    .where('toDate', '==', '')
    .get();
  const id = snapshot.docs[0].id;
  const data = snapshot.docs[0].data();

  // 取得股數
  let qtys = 0;
  // let inQtys = data.inQtys;
  // let outQtys = data.outQtys;
  // let minusCosts = data.minusCosts;

  let { inQtys, outQtys, minusCosts, costs, soldAmt } = data;

  // minusCosts = ((costs - minusCosts) / (inQtys - outQtys)) * outQty;
  minusCosts += (costs / (inQtys - outQtys)) * outQty;
  // minusCosts =Math.round (costs / (inQtys - outQtys)) * outQty;


  // minusCosts = Math.round(minusCosts)

  console.log(costs);

  // 累加購入成本
  costs = Number(data.costs) + inQty * price;
  // 累加已售金額
  soldAmt = Number(data.soldAmt) + Math.round(outQty * price);

  // 判斷是新增或刪除做不同處理

  switch (op) {
    case 'created':
      if (inQty) {
        qtys = Number(data.qtys) + Number(inQty);
        inQtys = Number(inQtys) + Number(inQty);
      } else {
        qtys = Number(data.qtys) - Number(outQty);
        outQtys = Number(outQtys) + Number(outQty);
      }
      break;
    case 'deleted':
      if (inQty) {
        qtys = Number(data.qtys) - Number(inQty);
        costs = Number(data.costs) - inQty * price;
        inQtys = Number(inQtys) - Number(inQty);
      } else {
        qtys = Number(data.qtys) + Number(outQty);
        soldAmt = Number(data.soldAmt) - outQty * price;
        outQtys = Number(outQtys) - Number(outQty);
      }
      break;
  }

  await db
    .collection('stockMaster')
    .doc(id)
    .update({ costs, soldAmt, qtys, inQtys, outQtys, minusCosts });

  return id;
};

const updateDoc = async (table, id, row) => {
  await db.collection(table).doc(id).update(row);
};

const deleteDoc = async (table, row) => {
  await db.collection(table).doc(row.id).delete();
};

export {
  readDocs,
  readDocsByStockName,
  createDoc,
  updateDoc,
  deleteDoc,
  updateMaster,
};
