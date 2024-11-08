import React, { useEffect, useState, useReducer } from 'react';
import schema from './data/schema.json';
import { readDocs, createDoc, updateDoc, deleteDoc } from './data/firestore';
import TableView from './components/TableView';
import { detailNewData } from './data/genNewData';
import EditForm from './components/EditForm';
import { Modal, Button } from 'semantic-ui-react';
import { detailReducer } from './data/detailReducer';

export default function index() {
  // 主表名稱
  const masterTable = 'master';
  // 明細表名稱
  const detailTable = 'detail';

  // 欄位資料
  const getColumns = (table) => {
    return schema.tables.find((t) => t.table == table).columns;
  };

  // 主表欄位
  const masterColumns = getColumns(masterTable);
  // 明細欄位
  const detailColumns = getColumns(detailTable);

  // 將資料存放在 state 傳給其他元件
  const [masterRows, setMasterRows] = useState([]);
  const [detailRows, setDetailRows] = useState([]);

  // 載入中
  const [loading, setLoading] = useState(false);

  // 主表資料
  const fetchMasterData = async () => {
    let result = await readDocs(masterTable);
    setMasterRows(result);
  };

  // 明細資料
  const fetchDetailData = async () => {
    setLoading(true);
    let result = await readDocs(detailTable);
    setDetailRows(detailNewData(result));
    setLoading(false);
  };

  useEffect(() => {
    // 讀取資料
    fetchMasterData();
    fetchDetailData();
  }, []);

  /******************************************/
  /***********      編輯相關     ************/
  /******************************************/

  
  // 預設物件
  const defaultRow = {};
  // 編輯列預設值
  detailColumns.map((obj) => {
    defaultRow[obj.name] = '';
  });

  const handleDelete = () => {   
    deleteDoc(detailTable, state.row.id);
    setDetailRows(detailRows.filter((obj) => obj.id != state.row.id));
    dispatch({ type: 'DELETE' });
  };

  const handleCreate = async () => {
    setLoading(true);
    const id = await createDoc(detailTable, state.row);
    const data = detailNewData([{ ...state.row, id }, ...detailRows]);
    setDetailRows(data);
    setLoading(false);

    dispatch({ type: 'CREATE' });
  };

  const handleUpdate = () => {
    setLoading(true);
    updateDoc(detailTable, state.row.id, state.row);
    // 修改表格中編輯列的值
    const tempRows = detailRows.slice();
    Object.assign(tempRows[state.rowIndex], state.row);
    const data = detailNewData(tempRows);
    setDetailRows(data);
    setLoading(false);
    dispatch({ type: 'UPDATE' });
  };

  const handleSave = () => {
    // 依照有編輯列索引值決定做新增或修改
    if (state.rowIndex == -1) {
      handleCreate();
    } else {
      handleUpdate();
    }
  };

  const handleChange = (e) => {
    dispatch({
      type: 'CHANGE',
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const [state, dispatch] = useReducer(detailReducer, {
    open: false,
    row: defaultRow,
    defaultRow,
    rowIndex: -1,
  });

  return (
    <>
      <TableView columns={masterColumns} rows={masterRows} />
      <TableView
        columns={detailColumns}
        rows={detailRows}
        handleAdd={() => dispatch({ type: 'ADD' })}
        handleEdit={(row, index) =>
          dispatch({ type: 'EDIT', payload: { row, index } })
        }
        loading={loading}
      />

      <Modal
        onClose={() => dispatch({ type: 'CLOSE' })}
        open={state.open}
        closeIcon
      >
        <Modal.Header>標題</Modal.Header>
        <Modal.Content>
          <EditForm
            row={state.row}
            handleChange={handleChange}
            columns={detailColumns}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={handleSave} loading={loading}>
            儲存
          </Button>
          <Button floated="left" color="red" onClick={handleDelete}>
            刪除
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
