import React, { useState, useEffect } from 'react';
import schema from './data/schema.json';
import useAsyncReducer from '../../utils/asyncReducer';
import { reducer } from './data/reducer';
import TableView from './components/TableView';
import EditForm from './components/EditForm';
import { Link } from 'react-router-dom';

export default function index() {
  // 預設資料物件
  const initState = {
    data: [], //資料
    loading: true, //載入中
    rowIndex: -1, //編輯列索引
    open: false, //顯示編輯表單
    total: {amt:0}, //各欄合計
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

  defaultRow.transDate = new Date().toISOString().substring(0, 10);

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
    // 編輯時,依原資料為買進或賣出,設定 isSold 的值
    // 這樣編輯表單的 MenuItem 才能正確顯示
    if (row.inQty) {
      setIsSold(false);
    } else {
      setIsSold(true);
    }
  };

  // 買進賣出
  const [isSold, setIsSold] = useState(false);

  return (
    <div>
      <Link to="/stock-master">StockMaster</Link>

      <EditForm
        columns={columns}
        row={row}
        setRow={setRow}
        state={state}
        dispatch={dispatch}
        isSold={isSold}
        setIsSold={setIsSold}
      />
      <TableView
        columns={columns}
        state={state}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        dispatch={dispatch}
      />
    </div>
  );
}
