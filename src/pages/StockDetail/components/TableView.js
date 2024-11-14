import React, { useState } from 'react';
import { Table, Button, Label } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import numberFormat from '../../../utils/numberFormat';

export default function TableView({
  state,
  columns,
  handleAdd,
  handleEdit,
  dispatch,
}) {
  const { data, loading, direction, column } = state;

  const handleDateClick = (date) => {
    dispatch({ type: 'FILTER', payload: { date } });
    console.log(date);
  };

  // 針對不同欄位做不同顯示
  const genColumn = (row, column) => {
    switch (column.name) {
      case 'amt':
        return numberFormat(row[column.name]);
      case 'price':
        return numberFormat(row[column.name]);
      case 'transDate':
        return (
          <Label onClick={() => handleDateClick(row.transDate)} size="large">
            {row[column.name]}
          </Label>
        );
      default:
        return row[column.name];
    }
  };

  return (
    <>
      <Table celled unstackable sortable>
        <Table.Header>
          <Table.Row>
            {columns.map((col, index) => {
              return (
                <Table.HeaderCell
                  sorted={column == col.name ? direction : null}
                  key={index}
                  onClick={() =>
                    dispatch({
                      type: 'SORT',
                      payload: { column: col.name, type: col.type },
                    })
                  }
                >
                  {col.label}
                  {/* 合計 */}
                  <br />
                  {state.total[col.name]}
                </Table.HeaderCell>
              );
            })}
            <Table.HeaderCell>
              <Button primary onClick={handleAdd} loading={loading}>
                新增
              </Button>
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              <Button onClick={() => dispatch({ type: 'LOAD' })}>全部</Button>
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((row, index) => {
            return (
              <Table.Row key={row.id}>
                {columns.map((col, index) => {
                  return (
                    <Table.Cell key={index}>{genColumn(row, col)}</Table.Cell>
                  );
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
