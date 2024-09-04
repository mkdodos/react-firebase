import React, { useState } from 'react';
import { Table, Button } from 'semantic-ui-react';

export default function TableViewEdit({ rows, obj,loading,handleAdd, handleEdit }) {
  const columns = Object.keys(obj);

  return (
    <>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            {columns.map((k, index) => {
              return <Table.HeaderCell key={index}>{obj[k]}</Table.HeaderCell>;
            })}
            <Table.HeaderCell width={2}>
              <Button primary onClick={handleAdd} loading={loading}>
                新增
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows.map((row,index) => {
            return (
              <Table.Row key={row.id}>
                {columns.map((col,index) => {
                  return <Table.Cell key={index}>{row[col]}</Table.Cell>;
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
