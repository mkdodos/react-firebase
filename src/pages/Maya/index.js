import React, { useEffect, useState } from 'react';
import { db } from '../../utils/firebase';
import TableView from './components/TableView';
import EditForm from './components/EditForm';

export default function Index() {
  // 預設物件
  const defaultRow = {
    date: new Date().toISOString().substring(0, 10),
    name: '',
  };
  // 物件資料集合
  const [rows, setRows] = useState([]);

  // 物件資料集合(複本搜尋用)
  const [rowsCopy, setRowsCopy] = useState([]);

  // 編輯列
  const [row, setRow] = useState(defaultRow);

  // 編輯列索引
  const [rowIndex, setRowIndex] = useState(-1);

  // 表單開關
  const [open, setOpen] = useState(false);

  // 載入中
  const [loading, setLoading] = useState(false);

  const colName = 'maya';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const snapshot = await db.collection(colName).get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setLoading(false);
    setRows(data);
    console.log(data);
  };

  const handleAdd = () => {
    setOpen(true);
    setRowIndex(-1);
    setRow(defaultRow);
  };

  // 儲存(新增或修改)
  const handleSave = () => {
    // 依照有編輯列索引值決定做新增或修改
    if (rowIndex == -1) {
      db.collection(colName)
        .add(row)
        .then((docRef) => {
          // 將編輯列加入資料陣列
          setRows([...rows, { ...row, id: docRef.id }]);
        });
    } else {
      // 修改表格中編輯列的值
      db.collection(colName)
        .doc(row.id)
        .update(row)
        .then(() => {
          const tempRows = rows.slice();
          Object.assign(tempRows[rowIndex], row);
          setRows(tempRows);
          setRowIndex(-1);
        });
    }

    // 關閉編輯視窗
    setOpen(false);
    // 將編輯列資料設定回預設值
    setRow(defaultRow);
  };

  // 刪除
  const handleDelete = () => {
    db.collection(colName)
      .doc(row.id)
      .delete()
      .then(() => {
        setRows(rows.filter((obj) => obj.id != row.id));
        setOpen(false);
      });
  };

  // 按下編輯鈕
  const handleEdit = (editedRow, index) => {
    setRow(editedRow);
    setRowIndex(index);
    setOpen(true);
  };

  // 修改欄位值
  const handleChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* <SearchBar
        rows={rows}
        setRows={setRows}
        rowsCopy={rowsCopy}
        setRowsCopy={setRowsCopy}
      /> */}
      <EditForm
        open={open}
        setOpen={setOpen}
        row={row}
        handleChange={handleChange}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
      <TableView
        loading={loading}
        rows={rows}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
      />
    </div>
  );
}
