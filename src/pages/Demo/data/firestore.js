import { db } from '../../../utils/firebase';

const createDoc = async (table, row) => {
  const docRef = await db.collection(table).add(row);

  return docRef.id;
  // .then((docRef) => {
  //   console.log(docRef.id)
  //   return docRef.id;
  // });
};

const readDoc = () => {};

const updateDoc = (table, id, row) => {
  db.collection(table).doc(id).update(row);
};

const deleteDoc = (table, id) => {
  db.collection(table).doc(id).delete();
};

export { createDoc, readDoc, updateDoc, deleteDoc };
