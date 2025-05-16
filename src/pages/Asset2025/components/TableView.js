import React from "react";
import { Table, Button,Icon } from "semantic-ui-react";

export default function TableView({ rows, columns,loading,handleAdd, handleEdit }) {
  return (
    <Table celled unstackable>
      <Table.Header>
        <Table.Row>
          {columns.map((col, index) => {
            return <Table.HeaderCell key={index}>{col.title}</Table.HeaderCell>;
          })}
          <Table.HeaderCell>
            <Button primary loading={loading} onClick={handleAdd}>
              <Icon name="plus" />
              新增
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row, rowIndex) => (
          <Table.Row key={rowIndex}>
            {columns.map((col, index) => {
              return <Table.Cell key={index}>{row[col.dataKey]}</Table.Cell>;
            })}
            <Table.Cell>
              <Button color="linkedin" onClick={() => handleEdit(row, rowIndex)}>
                編輯
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}


