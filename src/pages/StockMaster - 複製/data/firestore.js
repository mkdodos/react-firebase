import { db } from '../../../utils/firebase';

const readDocs = async (table) => {
  const snapshot = await db.collection(table).limit(100).get();
  let data = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  // data = data.filter(obj=>obj.stockName=='長榮')
  // data = data.filter(obj=>obj.stockName=='測試' || obj.stockName=='台積電' )
  data = data.filter((obj) => obj.stockName == '測試');
  // console.log(data)

  return data;
};

// 明細筆數
const readDetailRowCounts = async (stockName, fromDate) => {
  let snapshot = db
    .collection('stockDetail')
    .where('stockName', '==', stockName);
  snapshot = snapshot.where('transDate', '>=', fromDate);
  snapshot = await snapshot.orderBy('transDate', 'desc').get();
  // console.log(snapshot.size())
  return snapshot.size;
};

const createDoc = async (table, row) => {
  console.log(row)
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
