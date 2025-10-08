import { useEffect, useState } from "react";
import TableView from "./components/TableView";
import PivotView from "./components/PivotView";
// import EditForm from "./components/EditForm";

import { reducer } from "./data/reducer";
import schema from "./data/schema.json";

import { TabPane, Tab } from "semantic-ui-react";
import { collection } from "firebase11/firestore";

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

  const panes = [
    {
      menuItem: "樞紐分析表",
      render: () => (
        <TabPane>
          <PivotView data={state.data} />
        </TabPane>
      ),
    },
    {
      menuItem: "分數登錄",
      render: () => (
        <TabPane>
          {" "}
          <TableView
            state={state}
            dispatch={dispatch}
            columns={schema.columns}
          />
        </TabPane>
      ),
    },
   
  ];

  return (
    <>
      <Tab panes={panes} menu={{ color:"teal", secondary: true, pointing: true }} />

      {/* <EditForm /> */}
    </>
  );
}
