import React, { useState, useEffect } from 'react';
import schema from './data/schema.json';
import useAsyncReducer from './functions/asyncReducer';
import { reducer } from './data/reducer';
import TableView from './components/TableView';
import EditForm from './components/EditForm';
import { Link } from 'react-router-dom';
import StockPrice from './components/StockPrice';
import { Card, Form, Tab } from 'semantic-ui-react';
import CardView from './components/CardView';
import TableListSmall from './components/TableListSmall';

export default function index() {
  // 預設資料物件
  const initState = {
    data: [], //資料
    loading: true, //載入中
    rowIndex: -1, //編輯列索引
    open: false, //顯示編輯表單
    total: { bonus: 0 }, //各欄合計
  };

  const [state, dispatch] = useAsyncReducer(reducer, initState);

  useEffect(() => {
    // 讀取資料
    dispatch({ type: 'LOAD' });
  }, []);

  // 欄位預設值
  const defaultRow = {};

  let { columns } = schema;

  // 篩選欄位
  // const selectedColumns = ['stockName','avgCost','bonus'];

  const [selectedColumns, setSelectedColumns] = useState([
    'stockName',
    'avgCost',
    'bonus',
  ]);

  // columns = columns.filter((col) => selectedColumns.includes(col.name));

  columns.map((obj) => {
    defaultRow[obj.name] = '';
  });

  // 原本 row 放在 useAsyncReducer 會出現無法輸入中文的問題
  // 將其獨立出來處理
  const [row, setRow] = useState(defaultRow);

  const handleAdd = () => {
    dispatch({ type: 'ADD' });
    setRow(defaultRow);
  };

  const handleEdit = (row, index) => {
    dispatch({ type: 'EDIT', payload: { index } });
    // console.log(row)
    setRow(row);
  };

  return (
    <div>
      {/* <ColumnSelect setSelectedColumns={setSelectedColumns} /> */}
      {/* <CardView/> */}
      
      <Form>
        <Form.Group>
          <Form.Field>
            <Link to="/stock-detail">StockDetail</Link>
          </Form.Field>
          {/* <Form.Field>
            <StockPrice />
          </Form.Field> */}
        </Form.Group>
      </Form>
      <TableListSmall rows={state.data} />
      <EditForm
        columns={columns}
        row={row}
        setRow={setRow}
        state={state}
        dispatch={dispatch}
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
