import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";

export default function YearDropdown({ onChange,value }) {
  // 當年
  const year = new Date().getFullYear();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let arr = [];
    // 當年度往回推幾年
    for (let i = year; i > year - 6; i--) {
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
      clearable
      onChange={onChange}
      placeholder="選擇年份"
      options={options}
      value={value}
    />
  );
}
