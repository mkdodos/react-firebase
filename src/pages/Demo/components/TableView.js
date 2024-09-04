import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';

export default function TableView({ rows, obj }) {
  const columns = Object.keys(obj);

  return (
    <>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            {columns.map((k, index) => {
              return <Table.HeaderCell>{obj[k]}</Table.HeaderCell>;
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows.map((row) => {
            return (
              <Table.Row key={row.id}>
                {columns.map((col) => {
                  return <Table.Cell>{row[col]}</Table.Cell>;
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
