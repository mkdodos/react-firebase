import React from 'react';
import { Table, Button } from 'semantic-ui-react';

export default function TableView({ rows, handleEdit, handleAdd, loading }) {
  return (
    <div>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}>姓名</Table.HeaderCell>
            <Table.HeaderCell width={2}>參加人數</Table.HeaderCell>
            <Table.HeaderCell width={2}>金額</Table.HeaderCell>
            <Table.HeaderCell width={5}>備註</Table.HeaderCell>

            <Table.HeaderCell width={2}>
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
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>{row.people_qty}</Table.Cell>
                <Table.Cell>{row.amount}</Table.Cell>
                <Table.Cell>{row.note}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleEdit(row, index)}>編輯</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}