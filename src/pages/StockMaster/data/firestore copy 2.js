import { db } from '../../../utils/firebase';

const readDocs = async (table) => {
  const snapshot = await db.collection(table).limit(100).get();
  const data = snapshot.docs.map((doc) => {
    const { stockName, fromDate } = doc.data();
    // const a =await readDetailRowCounts(stockName, fromDate);
    let obj = {};
    const abc = readDetailRowCounts(stockName, fromDate).then((a) => {
      obj = { ...doc.data(), rowCounts: a.size, id: doc.id };
      console.log(obj);
      
      // return a.size;
    });
    return obj;
    // return { ...doc.data(), rowCounts:  a, id: doc.id };
    // return { ...doc.data(), id: doc.id };
  });

  return data;
};

// 明細筆數
const readDetailRowCounts = async (stockName, fromDate) => {
  // return stockName;
  let snapshot = await db
    .collection('stockDetail')
    .where('stockName', '==', stockName)
    .where('transDate', '>=', fromDate)
    .get();
  // console.log(snapshot.size())
  return snapshot;
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

export { readDocs, readDetailRowCounts, createDoc, updateDoc, deleteDoc };
