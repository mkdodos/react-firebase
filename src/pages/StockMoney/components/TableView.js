import React, { useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import numberFormat from '../../../utils/numberFormat';

export default function TableView({
  state,
  columns,
  handleAdd,
  handleEdit
}) {
  const { data, loading, total } = state;

  console.log(total)



  // 合計列
  const totalRow = (columns) => {
    return columns.map((col, index) => {
      if (!total[col.name])
        return <Table.HeaderCell key={index}></Table.HeaderCell>;
      return (
        <Table.HeaderCell key={index}>
          {numberFormat(total[col.name])}
        </Table.HeaderCell>
      );
    });
  };



  return (
    <>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            {total && totalRow(columns)}
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            {columns.map((col, index) => {
              return (
                <Table.HeaderCell key={index}>{col.label}</Table.HeaderCell>
              );
            })}
            <Table.HeaderCell>
              <Button primary onClick={handleAdd} loading={loading}>
                新增
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((row, index) => {
            return (
              <Table.Row key={row.id}>
                {columns.map((col, index) => {
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
