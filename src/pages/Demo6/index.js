import React, { useState, useEffect } from 'react';
import { masterReducer } from './data/masterReducer';
import schema from './data/schema.json';
import TableView from './components/TableView';
import MasterEditForm from './components/MasterEditForm';
import { Modal, Button } from 'semantic-ui-react';

export default function index() {
  // 欄位資料
  const getColumns = (table) => {
    return schema.tables.find((t) => t.table == table).columns;
  };

  // 主表名稱
  const masterTable = 'master';
  // 主表欄位
  const masterColumns = getColumns(masterTable);

  // 編輯
  // 預設物件
  const masterDefaultRow = {};
  // 編輯列預設值
  masterColumns.map((obj) => {
    masterDefaultRow[obj.name] = '';
  });

  // 原本 row 放在 useAsyncReducer 會出現無法輸入中文的問題
  // 將其獨立出來處理
  const [row, setRow] = useState(masterDefaultRow);
  const handleChangeMaster = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  // 預設資料物件
  const masterInitState = {
    table: masterTable,
    data: [],
    open: false,
    // defaultRow: masterDefaultRow,
    rowIndex: -1,
    column: null,
    direction: 'ascending',
  };

  // 此函數為參考網路,功能為讓 reducer 可以處理 async function
  function useAsyncReducer(reducer, initState) {
    const [state, setState] = useState(initState),
      dispatchState = async (action) => setState(await reducer(state, action));
    return [state, dispatchState];
  }

  const [masterState, masterDispatch] = useAsyncReducer(
    masterReducer,
    masterInitState
  );

  useEffect(() => {
    // 讀取資料
    masterDispatch({ type: 'LOAD' });
  }, []);

  return (
    <>
      <TableView
        columns={masterColumns}
        rows={masterState.data}
        handleAdd={() => {
          masterDispatch({ type: 'ADD' });
          setRow(masterDefaultRow);
        }}
        handleEdit={(row, index) => {
          masterDispatch({ type: 'EDIT', payload: { index } });
          setRow(row);
        }}
        dispatch={masterDispatch}
        state={masterState}
      />

      <Modal
        onClose={() => masterDispatch({ type: 'CLOSE' })}
        open={masterState.open}
        closeIcon
      >
        <Modal.Header>主表編輯</Modal.Header>
        <Modal.Content>
          <MasterEditForm
            row={row}
            columns={masterColumns}
            handleChange={handleChangeMaster}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            onClick={() =>
              masterDispatch({
                type: masterState.rowIndex == -1 ? 'CREATE' : 'UPDATE',
                payload: { row },
              })
            }
          >
            儲存
          </Button>
          <Button
            floated="left"
            color="red"
            onClick={() => masterDispatch({ type: 'DELETE', payload: { row } })}
          >
            刪除
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
