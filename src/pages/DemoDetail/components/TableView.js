import React from 'react';
import { Table, Button, Label } from 'semantic-ui-react';

export default function TableView({ columns, rows }) {
  console.log(rows);
  return (
    <Table celled unstackable sortable>
      <Table.Header>
        <Table.Row>
          {columns.map((col, index) => {
            return <Table.HeaderCell key={index}>{col.label}</Table.HeaderCell>;
          })}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rows.map((row, index) => {
          return (
            <Table.Row key={row.id}>
              {columns.map((column, index) => {
                return <Table.Cell key={index}>{row[column.name]}</Table.Cell>;
              })}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
