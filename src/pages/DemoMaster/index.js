import React, { useState, useEffect } from 'react';
import schema from './data/schema.json';
import TableView from './components/TableView';
import EditForm from './components/EditForm';
import { reducer } from './data/reducer';
import { Modal, Button } from 'semantic-ui-react';

export default function index() {
  // 資料表和欄位
  // console.log(schema);

  // 欄位資料(篩選屬性為可視欄位)
  const getColumns = () => {
    let columns = schema.columns;
    columns = columns.filter((col) => col.viewable);
    return columns;
  };

  // 表格和表單所需的欄位資料
  const columns = getColumns();

  // 預設資料物件
  const initState = {
    table: schema.table,
    data: [],
  };

  // 讀取資料

  // 此函數為參考網路,功能為讓 reducer 可以處理 async function
  function useAsyncReducer(reducer, initState) {
    const [state, setState] = useState(initState),
      dispatchState = async (action) => setState(await reducer(state, action));
    return [state, dispatchState];
  }

  const [state, dispatch] = useAsyncReducer(reducer, initState);

  useEffect(() => {
    // 讀取資料
    dispatch({ type: 'LOAD' });
  }, []);

  // 欄位預設值
  const defaultRow = {};

  columns.map((obj) => {
    defaultRow[obj.name] = '';
  });

  // 原本 row 放在 useAsyncReducer 會出現無法輸入中文的問題
  // 將其獨立出來處理
  const [row, setRow] = useState(defaultRow);

  const handleInputChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  const handleStockChange = (e, { value }) => {
    setRow({ ...row, stockName: value });
  };

  return (
    <>
      <TableView
        columns={columns}
        rows={state.data}
        state={state}
        dispatch={dispatch}
        handleAdd={() => {
          dispatch({ type: 'ADD' });
          setRow({
            ...defaultRow,
            fromDate: new Date().toISOString().substring(0, 10),
          });
        }}
        handleEdit={(row, index) => {
          dispatch({ type: 'EDIT', payload: { index } });
          setRow(row);
        }}
      />

      <Modal
        onClose={() => dispatch({ type: 'CLOSE' })}
        open={state.open}
        closeIcon
      >
        <Modal.Header>編輯</Modal.Header>
        <Modal.Content>
          <EditForm
            row={row}
            columns={columns}
            handleInputChange={handleInputChange}
            handleStockChange={handleStockChange}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            onClick={() =>
              dispatch({
                type: state.rowIndex == -1 ? 'CREATE' : 'UPDATE',
                payload: { row },
              })
            }
          >
            儲存
          </Button>
          <Button
            floated="left"
            color="red"
            onClick={() => dispatch({ type: 'DELETE', payload: { row } })}
          >
            刪除
          </Button>
        </Modal.Actions>
      </Modal>

      {/* <EditForm columns={columns} /> */}
    </>
  );
}
