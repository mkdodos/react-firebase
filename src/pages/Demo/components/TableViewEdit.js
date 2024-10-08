import React, { useState } from 'react';
import { Table, Button } from 'semantic-ui-react';

export default function TableViewEdit({ rows,columns, loading,handleAdd, handleEdit }) {
  // const columns = Object.keys(obj);

  // console.log(columns)

  return (
    <>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            {columns.map((col, index) => {
              return <Table.HeaderCell key={index}>{col.label}</Table.HeaderCell>;
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
                  return <Table.Cell key={index}>{row[col.name]}</Table.Cell>;
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
