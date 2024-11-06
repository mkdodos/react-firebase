import React, { useState, useEffect } from 'react';
import schema from './data/schema.json';
import useAsyncReducer from './functions/asyncReducer';
import { reducer } from './data/reducer';
import TableView from './components/TableView';

export default function index() {
  // 預設資料物件
  const initState = {
    table: schema.table, //資料表名稱
    data: [], //資料
    loading:true //載入中
  };

  const [state, dispatch] = useAsyncReducer(reducer, initState);

  useEffect(() => {
    // 讀取資料
    dispatch({ type: 'LOAD' });
  }, []);
  
  return (
    <div>
      <TableView columns={schema.columns} state={state} />
    </div>
  );
}
