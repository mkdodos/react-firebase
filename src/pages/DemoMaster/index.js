import React, { useState,useEffect } from 'react';
import schema from './data/schema.json';
import TableView from './components/TableView';
import EditForm from './components/EditForm';
import { reducer } from './data/reducer';

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
    table: 'master',
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

  return (
    <>
      <TableView columns={columns} rows={state.data} />
      <EditForm columns={columns} />
    </>
  );
}
