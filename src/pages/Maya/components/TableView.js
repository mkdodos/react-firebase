import React from 'react';
import { Table, Button } from 'semantic-ui-react';

export default function TableView({ rows, handleEdit, handleAdd, loading }) {
  return (
    <div>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell width={2}>日期</Table.HeaderCell>
            <Table.HeaderCell width={2}>姓名</Table.HeaderCell>
            <Table.HeaderCell width={2}>神廟</Table.HeaderCell>
            <Table.HeaderCell width={2}>建築</Table.HeaderCell>
            <Table.HeaderCell width={2}>分數</Table.HeaderCell>
            
           

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
                <Table.Cell>{row.date}</Table.Cell>
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>{row.temple}</Table.Cell>
                <Table.Cell>{row.building}</Table.Cell>
                <Table.Cell>{row.score}</Table.Cell>
              
               
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
