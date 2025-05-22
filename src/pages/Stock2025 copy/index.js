import React, { useEffect, useState } from "react";
import useAsyncReducer from "../../utils/asyncReducer";
import { reducer } from "./data/reducer";

import schema from "./data/schema.json";
import TableView from "./components/TableView";
import EditForm from "./components/EditForm";
import StockDropdown from "./components/StockDropdown";
import SearchBar from "./components/SearchBar";
import CardView from "./components/CardView";
import CardViewStock from "./components/CardViewStock";
import CardViewStockClosed from "./components/CardViewStockClosed";

import StockBasic2025 from "./components/StockBasic2025";

import { Tab, TabPane, Button, Checkbox } from "semantic-ui-react";

export default function index() {
  // 預設資料物件
  const initState = {
    data: [],
    dataByDate: [],
    loading: true,
    total: 0,
    options: [],
    search: { date: new Date().toISOString().substring(0, 10), stockNo: "" },
  };
  const [state, dispatch] = useAsyncReducer(reducer, initState);

  // console.log(state.data);

  const { columns } = schema;

  // 欄位預設值
  const defaultRow = {};
  let editableColumns = columns.filter((col) => col.editable);
  editableColumns.map((obj) => {
    defaultRow[obj.dataKey] = "";
  });

  defaultRow.date = new Date().toISOString().substring(0, 10);

  const [row, setRow] = useState(defaultRow);

  useEffect(() => {
    dispatch({ type: "LOAD" });
  }, []);

  // 新增
  const handleAdd = () => {
    setRow(defaultRow);
    dispatch({ type: "ADD" });
  };

  // 編輯
  const handleEdit = (row, index) => {
    setRow(row);
    dispatch({ type: "EDIT", payload: { editedRowIndex: index } });
  };

  const panes = [
    {
      menuItem: "基本",
      render: () => (
        <TabPane>
          <StockBasic2025 />
        </TabPane>
      ),
    },
    {
      menuItem: "日期別",
      render: () => (
        <TabPane>
          <CardView data={state.dataByDate} />
        </TabPane>
      ),
    },
    {
      menuItem: "股票別",
      render: () => (
        <TabPane>
          <CardViewStock
            data={state.dataByStock}
            // closedData={state.dataByStockClosed}
          />
        </TabPane>
      ),
    },
    {
      menuItem: "封存",
      render: () => (
        <TabPane>
          <CardViewStockClosed
            data={state.dataByStockClosed}
            // closedData={state.dataByStockClosed}
          />
        </TabPane>
      ),
    },
    {
      menuItem: "表格",
      render: () => (
        <TabPane>
          <TableView
            state={state}
            dispatch={dispatch}
            columns={columns}
            isEditable={true}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
          />
        </TabPane>
      ),
    },
  ];

  const [checked, setChecked] = useState(false);

  // console.log(checked)

  // const handleCheck = (e) => {
  //   console.log(e.checked);
  // };

  return (
    <>
      {/* <SearchBar state={state} dispatch={dispatch} /> */}

      {/* <Button onClick={() => dispatch({ type: "TEMP" })}>TEMP</Button> */}
      {/* <Button onClick={() => dispatch({ type: "NEXT_PAGE" })}>下一頁</Button> */}
      {/* <Checkbox
        toggle
        onChange={(e, data) => setChecked(data.checked)}
        checked={checked}
      /> */}
      <Button icon="refresh" onClick={() => dispatch({ type: "LOAD" })} />
      <Tab
        panes={panes}
        menu={{ color: "blue", secondary: true, pointing: true }}
      />

      <EditForm
        state={state}
        columns={columns}
        dispatch={dispatch}
        row={row}
        setRow={setRow}
      />
    </>
  );
}
