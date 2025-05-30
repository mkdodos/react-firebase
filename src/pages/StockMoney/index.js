import React, { useState, useEffect } from 'react';
import schema from './data/schema.json';
import useAsyncReducer from './functions/asyncReducer';
import { reducer } from './data/reducer';
import TableView from './components/TableView';
import EditForm from './components/EditForm';
import DatePicker from './components/DatePicker';

export default function index() {
  // 預設資料物件
  const initState = {
    data: [], //資料
    loading: true, //載入中
    rowIndex: -1, //編輯列索引
    open: false, //顯示編輯表單
  };

  const [state, dispatch] = useAsyncReducer(reducer, initState);

  useEffect(() => {
    // 讀取資料
    dispatch({ type: 'LOAD' });
  }, []);

  // 欄位預設值
  const defaultRow = {};

  const { columns } = schema;

  columns.map((obj) => {
    defaultRow[obj.name] = '';
  });

  defaultRow.date = new Date().toISOString().substring(0, 10);

  // 原本 row 放在 useAsyncReducer 會出現無法輸入中文的問題
  // 將其獨立出來處理
  const [row, setRow] = useState(defaultRow);

  const handleAdd = () => {
    dispatch({ type: 'ADD' });
    setRow(defaultRow);
  };

  const handleEdit = (row, index) => {
    dispatch({ type: 'EDIT', payload: { index } });
    setRow(row);
  };

  // 收入支出
  const [isExpense, setIsExpense] = useState(false);

  return (
    <div>
      <DatePicker  dispatch={dispatch} />
      <EditForm
        columns={columns}
        row={row}
        setRow={setRow}
        state={state}
        dispatch={dispatch}
        isExpense={isExpense}
        setIsExpense={setIsExpense}
      />
      <TableView
        columns={columns}
        state={state}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
      />
    </div>
  );
}
