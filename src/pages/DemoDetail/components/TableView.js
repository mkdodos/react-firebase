import React from 'react';
import { Table, Button, Label } from 'semantic-ui-react';
import numberFormat from '../../../utils/numberFormat';

export default function TableView({
  columns,
  rows,
  handleAdd,
  loading,
  handleEdit,
}) {
  // console.log(rows);
  return (
    <Table celled unstackable sortable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Button primary onClick={handleAdd} loading={loading}>
              新增
            </Button>
          </Table.HeaderCell>
          {columns.map((col, index) => {
            return <Table.HeaderCell key={index}>{col.label}</Table.HeaderCell>;
          })}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rows.map((row, index) => {
          return (
            <Table.Row key={row.id}>
              <Table.Cell>
                <Button onClick={() => handleEdit(row, index)}>編輯</Button>
              </Table.Cell>
              {columns.map((column, index) => {
                // 小計加上$號
                if (column.name == 'amt')
                  return (
                    <Table.Cell key={index}>
                      $ {numberFormat(row[column.name])}
                    </Table.Cell>
                  );
                return <Table.Cell key={index}>{row[column.name]}</Table.Cell>;
              })}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
