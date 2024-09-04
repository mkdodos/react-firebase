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
            {/* <Table.HeaderCell width={2}>欄位一</Table.HeaderCell>
            <Table.HeaderCell width={2}>欄位二</Table.HeaderCell> */}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows.map((row) => {
            return (
              <Table.Row key={row.id}>
                {columns.map((col) => {
                  return <Table.Cell>{row[col]}</Table.Cell>;
                })}

                {/* <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>{row.qty}</Table.Cell> */}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
