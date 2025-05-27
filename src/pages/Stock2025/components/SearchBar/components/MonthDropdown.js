import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";

export default function MonthDropdown({ onChange, value }) {
  // 沒有接收到參數時,會傳回 undefined

  // 當月
//   const month = new Date().getMonth() + 1;

//   if (value == undefined) {
//     value = month;
//   }


  const [options, setOptions] = useState([]);
  useEffect(() => {
    let arr = [];
    // 1 ~ 12
    for (let i = 1; i < 13; i++) {
      arr.push({
        key: i,
        text: i,
        value: i,
      });
    }
    setOptions(arr);
  }, []);

  return (
    <Dropdown
      selection
      onChange={onChange}
      placeholder="選擇月份"
      options={options}
      value={value}
    />
  );
}
