import React, { useState, useEffect } from 'react';
import { reducer } from './data/reducer';
import schema from './data/schema.json';
import SearchBar from './components/SearchBar';
import TableView from './components/TableView';
import EditForm from './components/EditForm';
import { Modal, Button, Search } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

export default function index() {
  let { stockName } = useParams();

  // 欄位資料
  const getColumns = (table) => {
    return schema.tables.find((t) => t.table == table).columns;
  };

  // 主表名稱
  const table = 'detail';
  // 主表欄位
  const columns = getColumns(table);

  // 欄位預設值
  const defaultRow = {};
  // 合計列預設值
  const defaultTotal = {};

  columns.map((obj) => {
    defaultRow[obj.name] = '';
    defaultTotal[obj.name] = '';
  });

  // 原本 row 放在 useAsyncReducer 會出現無法輸入中文的問題
  // 將其獨立出來處理
  const [row, setRow] = useState(defaultRow);


  // 買進賣出
  const [isSold, setIsSold] = useState(false);


  const handleInputChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  const handleStockChange = (e, { value }) => {
    setRow({ ...row, stockName: value });
  };


  



  // 預設資料物件
  const masterInitState = {
    table,
    data: [],
    open: false,
    loading: true,
    rowIndex: -1,
    column: null, // 標題列點選排序欄位
    direction: 'ascending',
    total: defaultTotal, // 各項合計
    search: { stockName },
  };

  // 此函數為參考網路,功能為讓 reducer 可以處理 async function
  function useAsyncReducer(reducer, initState) {
    const [state, setState] = useState(initState),
      dispatchState = async (action) => setState(await reducer(state, action));
    return [state, dispatchState];
  }

  const [masterState, masterDispatch] = useAsyncReducer(
    reducer,
    masterInitState
  );

  useEffect(() => {
    // 讀取資料
    masterDispatch({ type: 'LOAD' });
  }, []);

  return (
    <>
      <SearchBar dispatch={masterDispatch} />
      <TableView
        columns={columns}
        rows={masterState.data}
        handleAdd={() => {
          masterDispatch({ type: 'ADD' });
          setRow({
            ...defaultRow,
            transDate: new Date().toISOString().substring(0, 10),
          });
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
          <EditForm
            row={row}
            columns={columns}
            handleInputChange={handleInputChange}
            handleStockChange={handleStockChange}
            isSold={isSold}
            setIsSold={setIsSold}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            onClick={() =>
              masterDispatch({
                type: masterState.rowIndex == -1 ? 'CREATE' : 'UPDATE',
                payload: { row,isSold },
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
