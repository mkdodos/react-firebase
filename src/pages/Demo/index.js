import React, { useEffect, useState } from 'react';
import { db } from '../../utils/firebase';
import TableView from './components/TableView';

export default function index() {
  const [rows, setRows] = useState([]);
  // 文件集合名稱
  const colName = 'stocks';
  // const colName = 'balances';

  // 傳給 TableView
  // 欄位 key 為顯示內容 ,  value 為顯示標題
  const obj = {
    date: '日期',
    name: '項目',
    price: '支出',
    qty: '股數',
    
  };

  // const obj = {
  //   date: '日期',
  //   title: '項目',
  //   expense: '支出',
  //   cate: '類別',
  //   type: '類型',
   
  // };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const snapshot = await db.collection(colName).limit(10).get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    setRows(data);
  };

  return (
    <>
      <TableView rows={rows} obj={obj} />
    </>
  );
}
