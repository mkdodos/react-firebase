import React,{useState} from 'react';
import { Form } from 'semantic-ui-react';
import { db } from '../../../utils/firebase';

export default function StockDropdown({ handleChange,name,value }) {
  const [options, setOptions] = useState([]);

  const fetchData = async () => {
    const snapshot = await db.collection('stockBasic').get();
    const data = snapshot.docs.map((doc) => {
      const { stockName,stockNo } = doc.data();
      return { key: stockNo, text: stockName, value: stockNo };
    });
    setOptions(data);
  };

  fetchData()
 
  return (
    <Form.Field>
      <label>股票名稱</label>
      <Form.Select
        selection
        placeholder="名稱"
        fluid
        options={options}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </Form.Field>
  );
}
