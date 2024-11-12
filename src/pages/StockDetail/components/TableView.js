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

  // 針對不同欄位做不同顯示
  const genColumn = (row, column) => {
    let color = 'green';
    if (row[column.name] > 0) color = 'pink';
    switch (column.name) {
      case 'bonus':
        return (
          <Label size="large" basic color={color}>
            ${numberFormat(row[column.name])}
          </Label>
        );

      case 'costs':
        return numberFormat(row[column.name]);
      case 'soldAmt':
        return numberFormat(row[column.name]);
      case 'avgCost':
        return numberFormat(row[column.name]);

      case 'roi':
        return (
          <Label size="large" color={color}>
            {row[column.name]} %
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
                </Table.HeaderCell>
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
