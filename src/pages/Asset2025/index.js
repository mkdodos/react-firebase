import React, { useState, useEffect } from "react";
import schema from "./data/schema.json";
import { reducer } from "./data/reducer";
import TableView from "./components/TableView";
import EditForm from "./components/EditForm";
import AssetBasic from "./AssetBasic";
import { Tab, TabPane } from "semantic-ui-react";
import CardView from "./components/CardView";

import LineView from "./components/chart/LineView"
import BarView from "./components/chart/BarView"

export default function index() {
  // 預設資料物件
  const initState = {
    data: [], //資料
    dataByDate: [],
    dataByItem: [],
    loading: true,
  };

  // 此函數為參考網路,功能為讓 reducer 可以處理 async function
  function useAsyncReducer(reducer, initState) {
    const [state, setState] = useState(initState),
      dispatchState = async (action) => setState(await reducer(state, action));
    return [state, dispatchState];
  }

  const [state, dispatch] = useAsyncReducer(reducer, initState);

  useEffect(() => {
    // 讀取資料
    dispatch({ type: "LOAD" });
  }, []);

  // 欄位預設值
  const defaultRow = {};
  const { columns } = schema;
  columns.map((obj) => {
    defaultRow[obj.dataKey] = "";
  });

  defaultRow.date = new Date().toISOString().substring(0, 10);

  // 原本 row 放在 useAsyncReducer 會出現無法輸入中文的問題
  // 將其獨立出來處理
  const [row, setRow] = useState(defaultRow);

  const handleAdd = () => {
    dispatch({ type: "ADD" });
    setRow(defaultRow);
  };

  const handleEdit = (row, index) => {
    dispatch({ type: "EDIT", payload: { index } });
    setRow(row);
  };

  const panes = [
    {
      menuItem: "Line圖表",
      render: () => (
        <TabPane>
          <LineView
           data={state.dataByDate}
          />
        </TabPane>
      ),
    },
    {
      menuItem: "Bar圖表",
      render: () => (
        <TabPane>
          <BarView
           data={state.dataByDate}
          />
        </TabPane>
      ),
    },
    {
      menuItem: "項目統計",
      render: () => (
        <TabPane>
          <CardView
            loading={state.loading}
            groupKey="item"
            data={state.dataByItem}
            dispatch={dispatch}
          />
        </TabPane>
      ),
    },
    {
      menuItem: "日期統計",
      render: () => (
        <TabPane>
          <CardView
            groupKey="date"
            data={state.dataByDate}
            dispatch={dispatch}
          />
        </TabPane>
      ),
    },

    {
      menuItem: "交易記錄",
      render: () => (
        <TabPane>
          <TableView
            state={state}
            columns={columns}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
          />
        </TabPane>
      ),
    },
    {
      menuItem: "項目",
      render: () => (
        <TabPane>
          <AssetBasic />
        </TabPane>
      ),
    },
  ];

  return (
    <>
      <Tab panes={panes} />

      <EditForm
        columns={columns}
        row={row}
        setRow={setRow}
        state={state}
        dispatch={dispatch}
      />
    </>
  );
}
