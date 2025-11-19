import React, { useState, useEffect } from "react";
import schema from "./data/schema.json";
import { reducer } from "./data/reducer";
import TableView from "./components/TableView";
import CardView from "./components/CardView";
import EditForm from "./components/EditForm";

export default function index() {
  // 預設資料物件
  const initState = {
    data: [], //資料
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

  // 預設當日
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

  return (
    <>
      <CardView data={state.data} />
      <TableView
        state={state}
        columns={columns}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
      />
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
