import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { db } from '../../../utils/firebase';

// const options = statRows.map((obj) => {
//   return { key: obj.name, text: obj.name, value: obj.name };
// });

export default function StockDropdown({ onChange,value }) {
  const [options, setOptions] = useState([]);

  const readDocs = async (table) => {
    const snapshot = await db.collection(table).limit(20).orderBy('stockName').get();
    const data = snapshot.docs.map((doc) => {
      const stockName = doc.data().stockName;
      // console.log(stockName);
      return { key: stockName, text: stockName, value: stockName };
    });

    setOptions(data);
    // console.log(data);
    return data;
  };

  useEffect(() => {
    readDocs('master');
  }, []);

  return (
    <Form.Field>
      <label>股票名稱</label>
      <Form.Select
        selection
        placeholder="名稱"
        fluid
        options={options}
        onChange={onChange}
        name="stockName"
        value={value}
      />
    </Form.Field>
  );
}
