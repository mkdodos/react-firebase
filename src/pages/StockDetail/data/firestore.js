import { db } from '../../../utils/firebase';

const readDocs = async (table) => {
  const snapshot = await db.collection(table).limit(10).get();
  const data = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return data;
};

const updateMaster = async (row) => {
  const { stockName, inQty, outQty, price } = row;
  const snapshot = await db
    .collection('stockMaster')
    .where('stockName', '==', stockName)
    .where('toDate', '==', '')
    .get();
  const id = snapshot.docs[0].id;
  const data = snapshot.docs[0].data();
  const costs = data.costs + inQty * price;

  await db.collection('stockMaster').doc(id).update({ costs });

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

export { readDocs, updateMaster, createDoc, updateDoc, deleteDoc };
