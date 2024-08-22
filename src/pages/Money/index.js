import React, { useEffect, useState } from 'react';
// import { nanoid } from '@reduxjs/toolkit';
// import { API_HOST } from '../../../global/constants';
import { db } from '../../utils/firebase';
import TableView from './components/TableView';
import EditForm from './components/EditForm';

export default function index() {
  // 預設物件
  const defaultRow = {
    empName: '',
    basicAmt: '',
  };
  // 物件資料集合
  const [rows, setRows] = useState([]);

  // 編輯列
  const [row, setRow] = useState(defaultRow);

  // 編輯列索引
  const [rowIndex, setRowIndex] = useState(-1);

  // 表單開關
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  // const url = `${API_HOST}/salary/salaryBasic/read.php`;
  // const url = 'http://localhost:8888/pdo-echoway/salary/salaryBasic/read.php';

  const fetchData = async () => {
    const snapshot = await db.collection('wedding2022').orderBy('id').get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setRows(data);
    console.log(data);
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

  return (
    <div>
      <EditForm
        open={open}
        setOpen={setOpen}
        row={row}
        handleChange={handleChange}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
      <TableView rows={rows} handleAdd={handleAdd} handleEdit={handleEdit} />
    </div>
  );
}
