import React, { useEffect, useState } from 'react';
// import { nanoid } from '@reduxjs/toolkit';
// import { API_HOST } from '../../../global/constants';
import { db } from '../../utils/firebase';
import TableView from './components/TableView';
import EditForm from './components/EditForm';
import SearchBar from './components/SearchBar';
import { Button } from 'semantic-ui-react';
import ScrollTopButton from '../../components/ScrollTopButton';
import MoreButton from './components/MoreButton';
import SearchRange from './components/SearchRange';

export default function index() {
  // 預設物件
  const defaultRow = {
    empName: '',
    basicAmt: '',
  };
  // 物件資料集合
  const [rows, setRows] = useState([]);

  // 物件資料集合(搜尋用)
  const [rowsCopy, setRowsCopy] = useState([]);

  // 編輯列
  const [row, setRow] = useState(defaultRow);

  // 編輯列索引
  const [rowIndex, setRowIndex] = useState(-1);

  // 表單開關
  const [open, setOpen] = useState(false);

  // 載入中
  const [loading, setLoading] = useState(false);

  // 搜尋
  const [search, setSearch] = useState({ name: '',from:'',to:'' });

  // 總筆數
  const [rowsCount, setRowsCount] = useState(0);

  // 分頁
  // 記錄最後一筆 ID
  const [lastDoc, setLastDoc] = useState('');
  useEffect(() => {
    fetchData();
  }, []);
  // const url = `${API_HOST}/salary/salaryBasic/read.php`;
  // const url = 'http://localhost:8888/pdo-echoway/salary/salaryBasic/read.php';

  const fetchData = async () => {
    setLoading(true);
    const snapshot = await db
      .collection('wedding2022')
      .orderBy('id')
      .limit(15)
      .get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setRows(data);
    setRowsCopy(data);
    setLoading(false);

    const snapshotAll = await db.collection('wedding2022').get();

    setRowsCount(snapshotAll.size);

    // 最後一筆
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];

    setLastDoc(lastDoc);

    console.log(lastDoc);
  };

  const handleAdd = () => {
    setOpen(true);
    setRowIndex(-1);
    setRow(defaultRow);
  };

  // 按下編輯鈕
  const handleEdit = (editedRow, index) => {
    setOpen(true);
    setRow(editedRow);
    setRowIndex(index);
  };

  // 修改欄位值
  const handleChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  // 儲存(新增或修改)
  const handleSave = () => {
    // 依照有編輯列索引值決定做新增或修改
    if (rowIndex == -1) {
      // 將編輯列加入資料陣列
      setRows([...rows, { ...row, id: nanoid() }]);
    } else {
      // 修改表格中編輯列的值
      const tempRows = rows.slice();
      Object.assign(tempRows[rowIndex], row);
      setRows(tempRows);
      setRowIndex(-1);
    }

    // 將編輯列資料設定回預設值
    setRow(defaultRow);
    // 關閉編輯視窗
    setOpen(false);
  };

  // 刪除
  const handleDelete = () => {
    setRows(rows.filter((obj) => obj.id != row.id));
    setOpen(false);
  };

  // 查詢
  const handleQuery = () => {
    if (search.name != '') {
      setRows(rowsCopy.filter((obj) => obj.name.includes(search.name)));
    } else {
      setRows(rowsCopy);
    }
  };

  const handleMoreData = async () => {
    setLoading(true);
    const snapshot = await db
      .collection('wedding2022')
      .orderBy('id')
      .startAfter(lastDoc)
      .limit(5)
      .get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    // console.log(data)
    setRows([...rows, ...data]);
    setRowsCopy([...rowsCopy, ...data]);
    // setRowsCopy(data);
    setLoading(false);

    // 最後一筆
    // const lastDoc = snapshot.docs[snapshot.docs.length - 1];

    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

    // console.log(lastDoc);
  };

  const handleQueryRange = async ()=>{
    // console.log(search.from)
    // console.log(search.to)
    setLoading(true);
    const snapshot = await db
      .collection('wedding2022')      
      .where('people_qty','>=',search.from)
      .where('people_qty','<=',search.to)
      .limit(20)      
      .get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setRows(data)
    setLoading(false)

  }

  return (
    <div>
      <SearchRange search={search} setSearch={setSearch} handleQueryRange={handleQueryRange}/>
      <SearchBar
        loading={loading}
        handleQuery={handleQuery}
        search={search}
        setSearch={setSearch}
        rowsCount={rowsCount}
      />
      <EditForm
        open={open}
        setOpen={setOpen}
        row={row}
        handleChange={handleChange}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
      <TableView rows={rows} handleAdd={handleAdd} handleEdit={handleEdit} />
      <MoreButton handleMoreData={handleMoreData} />
      {/* <Button floated='right' color='teal' onClick={handleMore}>More</Button> */}
      <ScrollTopButton />
    </div>
  );
}
