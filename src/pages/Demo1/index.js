import React, { useEffect, useState } from 'react';
import { readDocs, createDoc, updateDoc, deleteDoc } from './data/firestore';
import Master from './master';
import Detail from './detail';

export default function index() {

  const masterTable = "master";

  // 主表資料
  const [masterRows, setMasterRows] = useState([]);

   // 載入中
   const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let result = await readDocs(masterTable);
    setMasterRows(result);
    setLoading(false);
  };

  return (
    <div>
      <Master masterRows={masterRows} />
      <Detail masterRows={masterRows} setMasterRows={setMasterRows} />
    </div>
  );
}
