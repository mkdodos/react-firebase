import React from 'react';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import schema from '../data/schema.json';

export default function DataSelect({ setTable, handleTableQuery }) {
  // console.log(schema.tables);

  const tables = schema.tables;
  const options = tables.map((t) => {
    return { key: t.id, text: t.table, value: t.table };
  });
  // console.log(data);

  // const options = [
  //   {
  //     key: '1',
  //     text: '類別',
  //     value: 'cates',
  //   },
  //   {
  //     key: '2',
  //     text: '收支',
  //     value: 'balances',
  //   },
  //   {
  //     key: '3',
  //     text: '存股',
  //     value: 'stockTransaction',
  //   },
  //   {
  //     key: '4',
  //     text: '測試',
  //     value: 'test',
  //   },
  //   {
  //     key: '5',
  //     text: '瑪雅',
  //     value: 'maya',
  //   },
  // ];

  const handleChange = (e, { value }) => {
    setTable(value);
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Field>
            <Form.Select
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
