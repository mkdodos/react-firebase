import React from 'react';
import { Button, Dropdown, Form } from 'semantic-ui-react';

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
    {
      key: '4',
      text: '測試',
      value: 'test',
    },
  ];

  const handleChange = (e, { value }) => {
    setTable(value);
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Field>
            <Dropdown
              onChange={handleChange}
              placeholder="選擇資料"
              options={options}
            />
          </Form.Field>
          <Form.Field>
            <Button onClick={handleTableQuery}>查詢</Button>
          </Form.Field>
        </Form.Group>
      </Form>
    </>
  );
}
