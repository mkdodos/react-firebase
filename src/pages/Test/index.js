import { useEffect, useState } from "react";
import { reducer } from "./data/reducer";
import schemaPost from "./data/schemaPost.json";
import schemaComment from "./data/schemaComment.json";
import schemaArrdone from "./data/schemaArrdone.json";
import TableView from "./components/TableView";

export default function Test() {
  // 預設資料物件
  const initState = {
    dataPosts: [], //資料
    dataComments: [], //資料
    dataArrdone: [], // 外包資料
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
  return (
    <>
      <TableView
        state={state}
        data={state.dataArrdone}
        columns={schemaArrdone.columns}
      />
      <TableView
        state={state}
        data={state.dataPosts}
        columns={schemaPost.columns}
      />
      <TableView
        state={state}
        data={state.dataComments}
        columns={schemaComment.columns}
      />
    </>
  );
}
