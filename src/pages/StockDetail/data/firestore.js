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

const updateDoc = async (table, id, row) => {
  await db.collection(table).doc(id).update(row);
};

const deleteDoc = async (table, row) => {
  await db.collection(table).doc(row.id).delete();
};

export { readDocs, readDocsByStockName, createDoc, updateDoc, deleteDoc };
