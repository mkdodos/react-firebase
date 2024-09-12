import React, { useState } from 'react';
import { Table,Button } from 'semantic-ui-react';

export default function TableView({ rows, columns,handleEdit }) {
 

  return (
    <>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            {columns.map((col, index) => {
              return <Table.HeaderCell>{col.label}</Table.HeaderCell>;
            })}
            <Table.HeaderCell>#</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows.map((row,index) => {
            return (
              <Table.Row key={row.id}>
                {columns.map((col) => {
                  return <Table.Cell>{row[col.name]}</Table.Cell>;
                })}
                <Table.Cell>
                  <Button onClick={() => handleEdit(row, index)}>編輯</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
