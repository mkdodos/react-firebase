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
    {
      type: 'text',
      name: 'addr',
      label: '地址',
    },
  ];

  // 組合每一列 group
  const formGroups = (columnsPerRow) => {
    const groups = [];
    for (let i = 0; i < columns.length; i++) {
      if (i % columnsPerRow == 0)
        groups.push(
          <Form.Group widths={columnsPerRow} key={i}>{formFields(i, columnsPerRow)}</Form.Group>
        );
    }
    return groups;
  };

  // 組合 group 中的 field
  const formFields = (index, columnsPerRow) => {
    let fields = [];
    columns.slice(index, index + columnsPerRow).map((col, index) => {
      fields.push(
        <Form.Field key={index}>
          <label>{col.label}</label>
          <input type={col.type} name={col.name} />
        </Form.Field>
      );
    });
    return fields;
  };

  // console.log(formGroups())

  return (
    <Form>
      {formGroups(2)}
      {/* {columns.map((col, index) => {
        return (
          <Form.Field key={index}>
            <label>{col.label}</label>
            <input type={col.type} name={col.name} />
          </Form.Field>
        );
      })} */}

      {/* <Form.Group widths={2}>
        <Form.Field>
          <Form.Input></Form.Input>
          <label>姓名</label>
          <input type="text" name="empName" />
        </Form.Field>
      </Form.Group> */}
    </Form>
  );
}
