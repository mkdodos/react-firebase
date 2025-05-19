import React, { useState, useEffect } from 'react';
import schema from './data/schema.json';
import { reducer } from './data/reducer';

export default function index() {
  // 預設資料物件
  const initState = {
    table: schema.table, //資料表名稱
    data: [], //資料
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
    dispatch({ type: 'LOAD' });
  }, []);

  return <div>{JSON.stringify(state.data)}</div>;
}


