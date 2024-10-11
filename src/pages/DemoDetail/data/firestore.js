import { db } from '../../../utils/firebase';

const createDoc = async (table, row) => {
  const docRef = await db.collection(table).add(row);

  // 更新主表
  const masterDoc = await db
    .collection('master')
    .where('stockName', '==', row.stockName)
    .get();

  const id = masterDoc.docs[0].id;
  // 股數
  const qtys = masterDoc.docs[0].data().qtys;
  // 成本
  const costs = masterDoc.docs[0].data().costs;
  updateDoc('master', id, {
    qtys: Number(qtys) + Number(row.qty),
    costs: Number(costs) + row.qty * row.price,
  });

  return docRef.id;
};

const readDocs = async (table) => {
  const snapshot = await db.collection(table).limit(10).get();
  const data = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return data;
};

const readDocsByStockName = async (table, stockName) => {
  const snapshot = await db
    .collection(table)
    .where('stockName', '==', stockName)    
    .get();
  const data = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return data;
};

// 依交易日期查詢
const readDocsByTransDate = async (table, transDate) => {
  const snapshot = await db
    .collection(table)
    .where('transDate', '==', transDate)
    .get();
  const data = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return data;
};

const updateDoc = (table, id, row) => {
  db.collection(table).doc(id).update(row);
};

const deleteDoc = async (table, row) => {
  await db.collection(table).doc(row.id).delete();

  // 更新主表
  const masterDoc = await db
    .collection('master')
    .where('stockName', '==', row.stockName)
    .get();

  const id = masterDoc.docs[0].id;
  // 股數
  const qtys = masterDoc.docs[0].data().qtys;
  // 成本
  const costs = masterDoc.docs[0].data().costs;
  updateDoc('master', id, {
    qtys: Number(qtys) - Number(row.qty),
    costs: Number(costs) - row.qty * row.price,
  });
};

export {
  createDoc,
  readDocs,
  updateDoc,
  deleteDoc,
  readDocsByStockName,
  readDocsByTransDate,
};
