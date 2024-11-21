import React from 'react';
import schema from '../data/schema.json';
import { Button, Dropdown } from 'semantic-ui-react';

export default function ColumnSelect({ setSelectedColumns }) {
  // console.log(schema.columns);
  const { columns } = schema;
  let options = [];
  columns.map((col) => {
    options.push({
      key: col.name,
      text: col.label,
      value: col.name,
    });
  });

  const handleClick = () => {};

  const handleChange = (e, { value }) => {
    setSelectedColumns(value);
    console.log(value);
  };

  return (
    <div>
      <Dropdown
        fluid
        selection
        multiple
        options={options}
        onChange={handleChange}
      />
      {/* <Button onClick={handleClick}>取值</Button> */}
    </div>
  );
}
