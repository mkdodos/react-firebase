import { db } from '../../../utils/firebase';

const readDocs = async (table) => {
  const snapshot = await db
    .collection(table)
    .orderBy('transDate', 'desc')
    .limit(100)
    .get();
  const data = snapshot.docs.map((doc) => {
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

// 更新主表
const updateMaster = async (row, op) => {
  const { stockName, inQty, outQty, price } = row;
  const snapshot = await db
    .collection('stockMaster')
    .where('stockName', '==', stockName)
    .where('toDate', '==', '')
    .get();
  const id = snapshot.docs[0].id;
  const data = snapshot.docs[0].data();
  let costs = Number(data.costs) + inQty * price;
  let soldAmt = Number(data.soldAmt) + outQty * price;
  let qtys = 0;

  let inQtys = data.inQtys;
  let outQtys = data.outQtys;

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
    .update({ costs, soldAmt, qtys, inQtys, outQtys });

  return id;
};

const createDoc = async (table, row) => {
  const docRef = await db.collection(table).add(row);
  return docRef.id;
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
  updateMaster,
  createDoc,
  updateDoc,
  deleteDoc,
};
