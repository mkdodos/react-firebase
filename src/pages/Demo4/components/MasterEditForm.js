import React from 'react';
import { Form } from 'semantic-ui-react';

export default function MasterEditForm({ columns, row, setRow,handleChange }) {
  // console.log(columns)
  // console.log(row)
  // 組合每一列 group
  const formGroups = (columnsPerRow) => {
    const groups = [];
    for (let i = 0; i < columns.length; i++) {
      if (i % columnsPerRow == 0)
        groups.push(
          <Form.Group widths={columnsPerRow} key={i}>
            {formFields(i, columnsPerRow)}
          </Form.Group>
        );
    }
    return groups;
  };

  // const handleChange = (e) => {
  //   setRow({ ...row, [e.target.name]: e.target.value });
  // };

  // 組合 group 中的 field
  const formFields = (index, columnsPerRow) => {
    let fields = [];
    columns.slice(index, index + columnsPerRow).map((col, index) => {
      if (!col.editable) return;
      fields.push(
        <Form.Field key={index}>
          <label>{col.label}</label>
          <input
            type={col.type}
            name={col.name}
            value={row[col.name]}
            onChange={handleChange}
          />
        </Form.Field>
      );
    });
    return fields;
  };

  return <Form>{formGroups(2)}</Form>;
}