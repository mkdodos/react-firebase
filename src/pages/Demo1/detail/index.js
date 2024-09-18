import React, { useEffect, useState } from 'react';
import { readDocs, createDoc, updateDoc, deleteDoc } from '../data/firestore';
import TableView from '../components/TableView';
import EditForm from './components/EditForm';
import schema from '../data/schema.json';
import { Modal, Button } from 'semantic-ui-react';

export default function index({ masterRows, setMasterRows }) {
  const masterTable = 'master';
  const table = 'detail';
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
    setRows(result);
    setLoading(false);
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
    setRows([{ ...row, id }, ...rows]);

    // 更新主表
    const masterStock = masterRows.find(
      (obj) => obj.stockName == row.stockName
    );
    // 主表 id
    const masterId = masterStock.id;
    // 原數量
    const qtys = Number(masterStock.qtys);
    // 新增數量
    const addedQty = Number(row.qty);

    updateDoc(masterTable, masterId, {
      qtys: qtys + addedQty,
      costs: row.qty * row.price,
    });

    // console.log(editedMasterRow)

    updateMasterRow(masterStock, 'plus');

    // console.log(tempRows);

    // 關閉編輯視窗
    setOpen(false);
  };

  const updateMasterRow = (masterStock, op) => {
    // 更新主表表格
    const masterIndex = masterRows.findIndex((obj) => obj.id == masterStock.id);
    const editedMasterRow = masterRows[masterIndex];
    if (op == 'plus') {
      editedMasterRow.qtys = Number(editedMasterRow.qtys) + Number(row.qty);
      editedMasterRow.costs =
        Number(editedMasterRow.costs) + row.qty * row.price;
    } else {
      editedMasterRow.qtys = Number(editedMasterRow.qtys) - Number(row.qty);
      editedMasterRow.costs =
        Number(editedMasterRow.costs) - row.qty * row.price;
    }

    const tempRows = masterRows.slice();
    Object.assign(tempRows[masterIndex], editedMasterRow);
    setMasterRows(tempRows);
  };

  const handleDelete = () => {
    setRows(rows.filter((obj) => obj.id != row.id));
    setOpen(false);
    deleteDoc(table, row.id);

    // 原數量
    // const qtys = Number(masterStock.qtys);
    // 變動數量
    // const addedQty = Number(row.qty);
    // 變動資料庫

    // 主表列
    const masterStock = masterRows.find(
      (obj) => obj.stockName == row.stockName
    );
    // 主表 id
    const masterId = masterStock.id;

    updateDoc(masterTable, masterId, {
      qtys: Number(masterStock.qtys) - Number(row.qty),
    });

    updateMasterRow(masterStock);
  };

  const handleUpdate = () => {
    console.log('update');

    updateDoc(table, row.id, row);
    // 修改表格中編輯列的值
    const tempRows = rows.slice();
    Object.assign(tempRows[rowIndex], row);
    setRows(tempRows);
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
