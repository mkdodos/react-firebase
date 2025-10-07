import { useEffect, useState } from "react";
import TableView from "./components/TableView";
// import EditForm from "./components/EditForm";

import { reducer } from "./data/reducer";
import schema from "./data/schema.json";

export default function index() {
  // 預設資料物件
  const initState = {
    data: [], //資料
    loading: true,
  };

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
      <TableView state={state} dispatch={dispatch} columns={schema.columns} />
      {/* <EditForm /> */}
    </>
  );
}
