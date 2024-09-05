import React from 'react';
import { Form } from 'semantic-ui-react';
import schema from '../data/schema.json';

export default function EditForm({columns,row,setRow}) {
  // console.log(schema)
  // const columns = schema.tables[0].columns
  // const columns = schema.tables[1].columns
  // const colName = "stocks"
  // const colName = "cates"
  // const columns = schema.tables.find((t) => t.table == colName).columns;
  // const columns = [
  //   {
  //     type: 'text',
  //     name: 'empName',
  //     label: '姓名',
  //   },
  //   {
  //     type: 'number',
  //     name: 'amt',
  //     label: '金額',
  //   },
  //   {
  //     type: 'date',
  //     name: 'birth',
  //     label: '生日',
  //   },
  //   {
  //     type: 'text',
  //     name: 'addr',
  //     label: '地址',
  //   },
  //   {
  //     type: 'text',
  //     name: 'note',
  //     label: '備註',
  //   },
  // ];

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


  const handleChange = (e)=>{

    // console.log('change')
  }

  // 組合 group 中的 field
  const formFields = (index, columnsPerRow) => {
    let fields = [];
    columns.slice(index, index + columnsPerRow).map((col, index) => {
      fields.push(
        <Form.Field key={index}>
          <label>{col.label}</label>
          <input type={col.type} name={col.name} value={row.qty} onChange={handleChange} />
        </Form.Field>
      );
    });
    return fields;
  };

  return <Form>{formGroups(2)}</Form>;
}
