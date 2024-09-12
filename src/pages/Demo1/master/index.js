import React, { useEffect, useState } from 'react';
import { readDocs } from '../data/firestore';
import TableView from '../components/TableView';
import EditForm from '../components/EditForm';
import schema from '../data/schema.json';
import { Modal } from 'semantic-ui-react';

export default function index() {
  const table = 'stockStat';
  const [rows, setRows] = useState([]);

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
    let result = await readDocs(table);
    setRows(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 按下編輯鈕
  const handleEdit = (editedRow, index) => {
    setOpen(true);
    setRow(editedRow);
    setRowIndex(index);
  };

  return (
    <div>
      Master
      <TableView rows={rows} columns={columns} handleEdit={handleEdit} />
     
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
            columns={columns}
          />
        </Modal.Content>
        <Modal.Actions>
          {/* <Button primary onClick={handleSave}>
            儲存
          </Button>
          <Button floated="left" color="red" onClick={handleDelete}>
            刪除
          </Button> */}
        </Modal.Actions>
      </Modal>
     
     
      
    </div>
  );
}
