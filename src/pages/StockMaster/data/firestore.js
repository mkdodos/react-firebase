import { db } from '../../../utils/firebase';

const readDocs = async (table) => {
  const snapshot = await db.collection(table).limit(100).get();
  const data = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return data;
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

export { readDocs, createDoc, updateDoc, deleteDoc };
