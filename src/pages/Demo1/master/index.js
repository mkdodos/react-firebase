import React, { useEffect, useState } from 'react';
import { readDocs, createDoc, updateDoc, deleteDoc } from '../data/firestore';
import TableView from '../components/TableView';
import EditForm from '../components/EditForm';
import schema from '../data/schema.json';
import { Modal, Button } from 'semantic-ui-react';

export default function index() {
  const table = 'master';
  const [rows, setRows] = useState([]);

  // 載入中
  const [loading, setLoading] = useState(false);
  // 表單開關
  const [open, setOpen] = useState(false);
  // 預設物件
  const defaultRow = {};
  // 編輯列
  const [row, setRow] = useState(defaultRow);
  // 編輯列索引
  const [rowIndex, setRowIndex] = useState(-1);

  const columns = schema.tables.find((t) => t.table == table).columns;

  const fetchData = async () => {
    setLoading(true);
    let result = await readDocs(table);

    const data = calColumns(result);

    setRows(data);
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setOpen(true);
    setRow(defaultRow);
    setRowIndex(-1);
  };

  // 按下編輯鈕
  const handleEdit = (editedRow, index) => {
    setOpen(true);
    setRow(editedRow);
    setRowIndex(index);
  };

  const handleCreate = async () => {
    // 將編輯列加入資料陣列
    const id = await createDoc(table, row);

    const data = calColumns([{ ...row, id }, ...rows]);

    setRows(data);

    // 關閉編輯視窗
    setOpen(false);
  };

  const handleDelete = () => {
    setRows(rows.filter((obj) => obj.id != row.id));
    setOpen(false);
    deleteDoc(table, row.id);
  };

  const handleUpdate = () => {
    updateDoc(table, row.id, row);
    // 修改表格中編輯列的值
    const tempRows = rows.slice();
    Object.assign(tempRows[rowIndex], row);

    const data = calColumns(tempRows);

    setRows(data);

    // setRows(tempRows);
    setRowIndex(-1);
    setOpen(false);
  };

  const handleSave = () => {
    // 依照有編輯列索引值決定做新增或修改
    if (rowIndex == -1) {
      handleCreate();
    } else {
      handleUpdate();
    }
  };

  return (
    <div>
      <TableView
        loading={loading}
        rows={rows}
        columns={columns}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
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
          <Button floated="left" color="red" onClick={handleDelete}>
            刪除
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
