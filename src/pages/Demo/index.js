import React, { useEffect, useState } from 'react';
import { db } from '../../utils/firebase';
import { Modal, Button } from 'semantic-ui-react';
import TableView from './components/TableView';
import TableViewEdit from './components/TableViewEdit';
import axios from 'axios';
import EditForm from './components/EditForm';
import schema from './data/schema.json';
import DataSelect from './components/DataSelect';

export default function index() {
  const [rows, setRows] = useState([]);
  // 文件集合名稱
  const [table, setTable] = useState('');
  const [columns, setColumns] = useState([]);
  // 表單開關
  const [open, setOpen] = useState(false);
  // 預設物件
  const defaultRow = {};
  // 編輯列
  const [row, setRow] = useState(defaultRow);

  // 編輯列索引
  const [rowIndex, setRowIndex] = useState(-1);

  useEffect(() => {
    // fetchFirebase();
    // columns.map((col) => (defaultRow[col.name] = ''));
  }, []);

  // 查詢
  const handleTableQuery = () => {
    // 取得資料表的欄位架構
    setColumns(schema.tables.find((t) => t.table == table).columns);
    fetchFirebase();
  };

  const fetchFirebase = async () => {
    const snapshot = await db.collection(table).limit(10).get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    console.log(data);
    setRows(data);
  };

  const handleAdd = () => {
    setOpen(true);
  };

  // 按下編輯鈕
  const handleEdit = (editedRow, index) => {
    setOpen(true);
    setRow(editedRow);
    setRowIndex(index);
  };

  const handleSave = () => {
    console.log(row);
  };

  return (
    <>
      <DataSelect
        table={table}
        setTable={setTable}
        handleTableQuery={handleTableQuery}
      />
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        closeIcon
      >
        <Modal.Header>標題</Modal.Header>
        <Modal.Content>
          <EditForm row={row} setRow={setRow} columns={columns} />
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={handleSave}>
            儲存
          </Button>
          <Button floated="left" color="red">
            刪除
          </Button>
        </Modal.Actions>
      </Modal>

      <TableViewEdit
        rows={rows}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        columns={columns}
      />
    </>
  );
}
