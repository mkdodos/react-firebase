import { db } from '../../../utils/firebase';

const createDoc = async (table, row) => {
  const docRef = await db.collection(table).add(row);
  return docRef.id;
};

const readDocs = async (table) => {
  const snapshot = await db.collection(table).limit(100).get();
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

export { createDoc, readDocs, updateDoc, deleteDoc };
