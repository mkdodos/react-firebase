import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react';

export default function DataSelect({ setTable, handleTableQuery }) {
  const options = [
    {
      key: '1',
      text: '類別',
      value: 'cates',
    },
    {
      key: '2',
      text: '收支',
      value: 'balances',
    },
    {
      key: '3',
      text: '存股',
      value: 'stockTransaction',
    },
  ];

  const handleChange = (e, { value }) => {
    setTable(value);
  };

  return (
    <>
      <Dropdown
        onChange={handleChange}
        placeholder="選擇資料"
        options={options}
      />
      <Button onClick={handleTableQuery}>查詢</Button>
    </>
  );
}
