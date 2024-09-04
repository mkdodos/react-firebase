import React from 'react';
import { Form } from 'semantic-ui-react';

export default function EditForm() {
  const columns = [
    {
      type: 'text',
      name: 'empName',
      label: '姓名',
    },
    {
      type: 'number',
      name: 'amt',
      label: '金額',
    },
    {
      type: 'date',
      name: 'birth',
      label: '生日',
    },
  ];

  return (
    <Form>
      {columns.map((col, index) => {
        return (
          <Form.Field key={index}>
            <label>{col.label}</label>
            <input type={col.type} name={col.name} />
          </Form.Field>
        );
      })}

      {/* <label>姓名</label>
        <input type="text" name="empName" /> */}
    </Form>
  );
}
