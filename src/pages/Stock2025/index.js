import React, { useState, useEffect } from "react";
import schema from "./data/schema.json";
import { reducer } from "./data/reducer";
import TableView from "./components/TableView";
import TableViewSmall from "./components/TableViewSmall";
import EditForm from "./components/EditForm";

import { Tab, TabPane } from "semantic-ui-react";
import CardView from "./components/CardView";

import ScrollTopButton from "../../components/ScrollTopButton";

import StockBasic2025 from "./StockBasic2025";

import SearchBar from "./components/SearchBar";

export default function index() {
  let m = new Date().getMonth() + 1;
  // 月份小於 10 補 0 (配合下拉清單)
  m = m < 10 ? "0" + m : m;
  // 預設資料物件
  const initState = {
    data: [], //資料
    dataByDate: [],
    dataByItem: [],
    loading: true,
    search: {
      year: new Date().getFullYear(),
      month: "",
      stock:""
      // month: m,
    },
  };

  // 此函數為參考網路,功能為讓 reducer 可以處理 async function
  function useAsyncReducer(reducer, initState) {
    const [state, setState] = useState(initState),
      dispatchState = async (action) => setState(await reducer(state, action));
    return [state, dispatchState];
  }

  const [state, dispatch] = useAsyncReducer(reducer, initState);

  //
  const [isMobile, setIsMobile] = useState(true);

  const handleWindowResize = () => {
    if (window.innerWidth <= 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    // 讀取資料
    dispatch({ type: "LOAD" });

    // 載入時依螢幕寬度設定版面
    handleWindowResize();

    // 每次有調整螢幕寬度時,再設定版面
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
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

  const [isSold, setIsSold] = useState(true);

  const handleAdd = () => {
    dispatch({ type: "ADD" });
    setRow(defaultRow);
  };

  // 編輯時,依買入或買出數量顯示(在編輯表單中依isSold顯示)
  const handleEdit = (row, index) => {
    dispatch({ type: "EDIT", payload: { index } });
    if (row.inQty) {      
      setIsSold(false);
    } else {     
      setIsSold(true);
    }

    setRow(row);
  };

  const panes = [
    {
      menuItem: "日期統計",
      render: () => (
        <TabPane>
          <CardView
            loading={state.loading}
            groupKey="date"
            data={state.dataByDate}
            dispatch={dispatch}
          />
        </TabPane>
      ),
    },

    {
      menuItem: "項目統計",
      render: () => (
        <TabPane>
          <CardView
            groupKey="stockName"
            data={state.dataByItem}
            dispatch={dispatch}
          />
        </TabPane>
      ),
    },
    {
      menuItem: "交易記錄",
      render: () => (
        <TabPane>
          {isMobile ? (
            <TableViewSmall
              state={state}
              columns={columns}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
            />
          ) : (
            <TableView
              state={state}
              columns={columns}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
            />
          )}
        </TabPane>
      ),
    },
    {
      menuItem: "基本資料",
      render: () => (
        <TabPane>
          <StockBasic2025 />
        </TabPane>
      ),
    },
    {
      menuItem: "封存項目",
      render: () => (
        <TabPane>
          <CardView
            groupKey="stockName"
            data={state.dataByItemClosed}
            dispatch={dispatch}
          />
        </TabPane>
      ),
    },
  ];

  return (
    <>
      {isMobile}
      <ScrollTopButton />
      <SearchBar dispatch={dispatch} state={state} />
      <Tab
        panes={panes}
        menu={{ color: "blue", secondary: true, pointing: true }}
      />

      <EditForm
        columns={columns}
        row={row}
        setRow={setRow}
        state={state}
        dispatch={dispatch}
        isSold={isSold}
        setIsSold={setIsSold}
      />
    </>
  );
}
