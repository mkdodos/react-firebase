import React, { useEffect, useState } from 'react';
import { readDocs, createDoc, updateDoc, deleteDoc } from './data/firestore';
import Master from './master';
import Detail from './detail';

export default function index() {
  const masterTable = 'master';

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
    
    setMasterRows(calColumns(result));
    setLoading(false);
  };

  // 計算各項欄位

  const calColumns = (data) => {
    return data.map((obj) => {
      const { costs, qtys, nowPrice } = obj;

      return {
        ...obj,
        avgPrice: costs / qtys, //平均成本
        amt: qtys * nowPrice, //市值
        bonus: qtys * nowPrice - costs, //損益
      };
    });
  };


  return (
    <div>
      <Master masterRows={masterRows} setMasterRows={setMasterRows} />
      <Detail masterRows={masterRows} setMasterRows={setMasterRows} />
    </div>
  );
}
