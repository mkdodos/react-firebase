import React from 'react';
import { Table, Button, Label } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function TableView({
  rows,
  columns,
  handleEdit,
  handleAdd,
  dispatch,
  state,
}) {
  // 針對不同欄位做不同顯示
  const genColumn = (row, column, index) => {
    let color = 'green';
    if (row[column.name] > 0) color = 'pink';
    switch (column.name) {
      case 'stockName':
        return (
          <NavLink to={'/demo-detail/' + row[column.name]}>
            {row[column.name]}
          </NavLink>
        );

      case 'bonus':
        return (
          <Label size="large" color={color} >
             {row[column.name]}
          </Label>
        );

      case 'roi':
        return (
          <Label size="large" color={color} basic>
            {row[column.name]} %
          </Label>
        );

      default:
        return row[column.name];
    }
  };

  const { direction, loading, column, total } = state;

  return (
    <>
      <Table celled unstackable sortable>
        <Table.Header>
          <Table.Row>
            {columns.map((col, index) => {
              return (
                <Table.HeaderCell
                  sorted={column == col.name ? direction : null}
                  onClick={() =>
                    dispatch({ type: 'SORT', payload: { column: col.name,type:col.type } })
                  }
                  key={index}
                >
                  {col.label} {total[col.name]}
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
          {rows.map((row, index) => {
            return (
              <Table.Row key={row.id}>
                {columns.map((column, index) => {
                  return (
                    <Table.Cell key={index}>
                      {genColumn(row, column, index)}
                    </Table.Cell>
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
