import { db } from '../../../utils/firebase';

const createDoc = async (table, row) => {
  const docRef = await db.collection(table).add(row);
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

const deleteDoc = (table, id) => {
  db.collection(table).doc(id).delete();
};

export {
  createDoc,
  readDocs,
  updateDoc,
  deleteDoc,
  readDocsByStockName,
  readDocsByTransDate,
};