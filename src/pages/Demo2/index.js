import React, { useState } from 'react';
import schema from './data/schema.json';
import { readDocs } from './data/firestore';
import TableView from './components/TableView';

export default function index() {
  // 主表名稱
  const masterTable = 'master';
  // 明細表名稱
  const detailTable = 'detail';

  const getColumns = (table) => {
    return schema.tables.find((t) => t.table == table).columns;
  };

  // 主表欄位
  const masterColumns = getColumns(masterTable);
  // 明細欄位
  const detailColumns = getColumns(detailTable);
  console.log(schema);
  console.log(masterColumns);
  console.log(detailColumns);

  // 將資料存放在 state 傳給其他元件
  const [masterRows, setMasterRows] = useState([]);
  const [detailRows, setDetailRows] = useState([]);

  const fetchMasterData = async () => {
    let result = await readDocs(masterTable);
    setMasterRows(result);
    console.log(result);
  };

  const fetchDetailData = async () => {
    let result = await readDocs(detailTable);
    setDetailRows(result);
    console.log(result);
  };

  // 讀取資料
  fetchMasterData();
  fetchDetailData();

  return (
    <>
      <TableView columns={masterColumns} rows={masterRows} />
      <TableView columns={detailColumns} rows={detailRows} />
    </>
  );
}
