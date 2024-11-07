import React,{useState} from 'react';
import { Form } from 'semantic-ui-react';
import { db } from '../../../utils/firebase';

export default function StockDropdown({ handleChange,name,value }) {
  const [options, setOptions] = useState([]);

  const fetchData = async () => {
    const snapshot = await db.collection('test').get();
    const data = snapshot.docs.map((doc) => {
      const { stockName } = doc.data();
      return { key: stockName, text: stockName, value: stockName };
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
