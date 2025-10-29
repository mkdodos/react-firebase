import { useEffect, useState } from "react";
import TableView from "./components/TableView";
// import PivotView from "./components/PivotView";
// import DayView from "./components/DayView";
import EditForm from "./components/EditForm";

import { reducer } from "./data/reducer";
import schema from "./data/schema.json";

import { TabPane, Tab } from "semantic-ui-react";

import ClassSelector from "./components/ClassSelector";

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

  // 欄位預設值
  const defaultRow = {};
  const { columns } = schema;
  columns.map((obj) => {
    defaultRow[obj.dataKey] = "";
  });

  // 預設當日
  defaultRow.date = new Date().toISOString().substring(0, 10);

  const [row, setRow] = useState(defaultRow);

  const handleAdd = () => {
    dispatch({ type: "ADD" });
    setRow(defaultRow);
  };

  const handleEdit = (row, index) => {
    dispatch({ type: "EDIT", payload: { index } });
    setRow(row);
  };

  useEffect(() => {
    // 讀取資料
    dispatch({ type: "LOAD" });
  }, []);

  // const panes = [
  //   {
  //     menuItem: "對戰組合",
  //     render: () => (
  //       <TabPane>
  //         {" "}
  //         <DayView
  //           state={state}
  //           dispatch={dispatch}

  //         />
  //       </TabPane>
  //     ),
  //   },
  //   {
  //     menuItem: "分數登錄",
  //     render: () => (
  //       <TabPane>
  //         {" "}
  //         <TableView
  //           state={state}
  //           dispatch={dispatch}
  //           columns={schema.columns}
  //           handleAdd={handleAdd}
  //           handleEdit={handleEdit}
  //         />
  //       </TabPane>
  //     ),
  //   },
  //   {
  //     menuItem: "樞紐分析表",
  //     render: () => (
  //       <TabPane>
  //         <PivotView data={state.data} />
  //       </TabPane>
  //     ),
  //   },
  // ];

  return (
    <>
      {/* <Tab
        panes={panes}
        menu={{ tabular: false, color: "teal", secondary: true, pointing: true }}
      /> */}

      <ClassSelector dispatch={dispatch} state={state} />

      <TableView 
      handleEdit={handleEdit}
      state={state} rows={state.data} columns={schema.columns} />

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
