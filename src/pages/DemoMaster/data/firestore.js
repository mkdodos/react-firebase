import { db } from '../../../utils/firebase';

const createDoc = async (table, row) => {
  const docRef = await db.collection(table).add(row);
  return docRef.id;
};

const readDocs = async (table) => {
  const snapshot = await db.collection(table).orderBy('stockNo').limit(30).get();
  const data = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return data;
};

const updateDoc = (table, id, row) => {
  db.collection(table).doc(id).update(row);
};

const deleteDoc =async (table, row) => {
  // console.log(table)
  // console.log(row.id)
  await db.collection(table).doc(row.id).delete();
};

export { createDoc, readDocs, updateDoc, deleteDoc };
