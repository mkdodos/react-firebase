import { db } from '../../../utils/firebase';

const readDocs = async (table) => {
  const snapshot = await db.collection(table).limit(10).get();
  const data = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return data;
};

// 更新主表
const updateMaster = async (row) => {
  const { stockName, inQty, outQty, price } = row;
  const snapshot = await db
    .collection('stockMaster')
    .where('stockName', '==', stockName)
    .where('toDate', '==', '')
    .get();
  const id = snapshot.docs[0].id;
  const data = snapshot.docs[0].data();
  const costs = Number(data.costs) + inQty * price;
  const soldAmt = Number(data.soldAmt) + outQty * price;
  let qtys = 0
  if(inQty){
    qtys = Number(data.qtys) + Number(inQty);
  }else{
    qtys = Number(data.qtys) - Number(outQty);
  }
  

  await db.collection('stockMaster').doc(id).update({ costs, soldAmt, qtys });

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
