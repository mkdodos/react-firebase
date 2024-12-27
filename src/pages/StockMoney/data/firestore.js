import { db } from '../../../utils/firebase';

const readDocs = async (table) => {
  const snapshot = await db
    .collection(table)
    .where('cate', '==', '存股')
    .orderBy('date', 'desc')
    .limit(50)
    .get();

  // const snapshot = await db.collection(table).limit(10).get();

  const data = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return data;
};




const readDocsByDate = async (table, fromDate,toDate) => {
  // console.log(fromDate)
  // console.log(toDate)
  const snapshot = await db
    .collection(table)
    .where('cate', '==', '存股')
    .where('date', '>=', fromDate)
    .where('date', '<=', toDate)
    .orderBy('date', 'desc')
    .limit(20)
    .get();  

  const data = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return data;
};


const readAndCreate = async () => {
  const snapshot = await db.collection('master').get();
  const data = snapshot.docs.map((doc) => {
    const { stockNo, stockName } = doc.data();
    db.collection('stockMaster').add({
      stockNo,
      stockName,
      toDate: '',
      costs: 0,
      qtys: 0,
      soldAmt: 0,
    });
  });
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

export { readDocs, createDoc, updateDoc, deleteDoc, readAndCreate,readDocsByDate };
