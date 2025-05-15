import React, { useEffect, useMemo, useState, memo, useCallback } from "react";
import { Form } from "semantic-ui-react";
import { db } from "../../../utils/firebase";

function StockDropdown({ onChange, name, value,options }) {
  // const [options, setOptions] = useState([]);

  // const fetchData = async () => {
  //   const snapshot = await db.collection("stockBasic").orderBy("stockNo").get();
  //   console.log(snapshot.size);
  //   const data = snapshot.docs.map((doc) => {
  //     const { stockName, stockNo } = doc.data();
  //     return { key: stockNo, text: stockNo + " " + stockName, value: stockNo };
  //   });
  //   setOptions(data);
  // };

  // const fetchData = useCallback(async () => {
  //   const snapshot = await db.collection("stockBasic").orderBy("stockNo").get();
  //   console.log(snapshot.size);
  //   const data = snapshot.docs.map((doc) => {
  //     const { stockName, stockNo } = doc.data();
  //     return { key: stockNo, text: stockNo + " " + stockName, value: stockNo };
  //   });
  //   setOptions(data);
  // }, []);

  // console.log("render");

  // console.log(fetchData())

  // const testMemo = useMemo(()=>{

  //   fetchData()

  // },[options])

  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <Form.Field>
      <label>股票名稱</label>
      <Form.Select
        selection
        search
        clearable
        placeholder="名稱"
        fluid
        options={options}
        name={name}
        value={value}
        onChange={onChange}
      />
    </Form.Field>
  );
}

export default StockDropdown;
