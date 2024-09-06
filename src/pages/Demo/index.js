import React, { useEffect, useState } from 'react';
import { db } from '../../utils/firebase';
import { Modal, Button } from 'semantic-ui-react';
import TableView from './components/TableView';
import TableViewEdit from './components/TableViewEdit';
import axios from 'axios';
import EditForm from './components/EditForm';
import schema from './data/schema.json';
import DataSelect from './components/DataSelect';

import { createDoc, deleteDoc } from './data/firestore';

export default function index() {
  const [rows, setRows] = useState([]);
  // 文件集合名稱
  const [table, setTable] = useState('test');
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
    setColumns(schema.tables.find((t) => t.table == table).columns);
    fetchFirebase();

    // columns.map((col) => (defaultRow[col.name] = ''));
  }, []);

  // 查詢
  const handleTableQuery = () => {
    // 取得資料表的欄位架構
    setColumns(schema.tables.find((t) => t.table == table).columns);
    fetchFirebase();
  };

  const fetchFirebase = async () => {
    const snapshot = await db.collection(table).limit(3).get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    console.log(data);
    setRows(data);
  };

  const handleAdd = () => {
    setOpen(true);
    setRow(defaultRow);
    setRowIndex(-1);
  };

  const handleCreate = async () => {
    // 將編輯列加入資料陣列
    const id = await createDoc(table, row);
    setRows([{ ...row, id }, ...rows]);

    console.log(id);

    // 關閉編輯視窗
    setOpen(false);
  };

  const handleDelete = () => {
    setRows(rows.filter((obj) => obj.id != row.id));
    setOpen(false);
    deleteDoc(table, row.id);
  };

  // 按下編輯鈕
  const handleEdit = (editedRow, index) => {
    setOpen(true);
    setRow(editedRow);
    setRowIndex(index);
  };

  const handleSave = () => {
    // 依照有編輯列索引值決定做新增或修改
    if (rowIndex == -1) {
      handleCreate();
    } else {
    }
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
          <EditForm
            row={row}
            setRow={setRow}
            handleDelete={handleDelete}
            columns={columns}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={handleSave}>
            儲存
          </Button>
          <Button floated="left" color="red" onClick={handleDelete}>
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
