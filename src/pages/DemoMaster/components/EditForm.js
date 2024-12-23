import React from 'react';
import { Form } from 'semantic-ui-react';

export default function EditForm({ columns, row, handleInputChange }) {
  // 篩選可編輯欄位
  columns = columns.filter((col) => col.editable);

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

  // 組合 group 中的 field
  const formFields = (index, columnsPerRow) => {
    let fields = [];
    columns.slice(index, index + columnsPerRow).map((col, index) => {
      // if (!col.editable) return;
      fields.push(
        <Form.Field key={index}>
          <label>{col.label}</label>
          <Form.Input
            type={col.type}
            name={col.name}
            value={row[col.name]}
            onChange={handleInputChange}
          />
        </Form.Field>
      );
    });
    return fields;
  };

  return <Form>{formGroups(3)}</Form>;
}
