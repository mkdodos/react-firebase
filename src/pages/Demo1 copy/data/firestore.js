import { db } from '../../../utils/firebase';

const createDoc = async (table, row) => {
  const docRef = await db.collection(table).add(row);

  return docRef.id;
  // .then((docRef) => {
  //   console.log(docRef.id)
  //   return docRef.id;
  // });
};

const readDocs = async (table) => {
  const snapshot = await db.collection(table).limit(10).get();
  const data = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  // console.log(data)
  return data;
};

const updateDoc = (table, id, row) => {
  db.collection(table).doc(id).update(row);
};

const deleteDoc = (table, id) => {
  db.collection(table).doc(id).delete();
};

export { createDoc, readDocs, updateDoc, deleteDoc };
