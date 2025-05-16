import React, { useState, useEffect } from "react";
import schema from "./data/schema.json";
import useAsyncReducer from "../../utils/asyncReducer";
import { reducer } from "./data/reducer";
import TableView from "./components/TableView";

export default function index() {
  // 預設資料物件
  const initState = {
    data: [], //資料
  };

  const [state, dispatch] = useAsyncReducer(reducer, initState);

  useEffect(() => {
    // 讀取資料
    dispatch({ type: "LOAD" });
  }, []);

  

  return (
    <div>
      <TableView rows={state.data} columns={schema.columns} />
    </div>
  );
}
