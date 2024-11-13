import React,{useState} from 'react';
import { Form } from 'semantic-ui-react';
import { db } from '../../../utils/firebase';

export default function StockDropdown({ onChange,name,value }) {
  const [options, setOptions] = useState([]);

  const fetchData = async () => {
    const snapshot = await db.collection('stockBasic').orderBy('stockNo').get();
    const data = snapshot.docs.map((doc) => {
      const { stockName,stockNo } = doc.data();
      return { key: stockNo, text:stockNo+' '+stockName, value: stockNo };
    });
    setOptions(data);
  };

  fetchData()
 
  return (
    <Form.Field>
      <label>股票名稱</label>
      <Form.Select
        selection
        search
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
