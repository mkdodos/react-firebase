import React from 'react';
import { Table, Button } from 'semantic-ui-react';

export default function TableView({ state, columns, handleEdit, handleAdd }) {
  console.log(state);
  const { loading, data, total } = state;

  // 合計列
  // const totalRow = (columns) => {
  //   return columns.map((col, index) => {

  //     return (
  //       <Table.HeaderCell key={index}>
  //         {total.inQty}
  //       </Table.HeaderCell>
  //     );

  //     console.log(col.name)
  //   })

  // };

  // 合計列
  const totalRow = (columns) => {
    return columns.map((col, index) => {
      if (col.name == 'inQty') {
        return (
          <Table.HeaderCell key={index}>
            {total.inQty}
            {/* <br />
            {total.avgCost} */}
          </Table.HeaderCell>
        );
      }
      if (col.name == 'outQty') {
        return (
          <Table.HeaderCell key={index}>
            {total.outQty}
            {/* <br />
            {total.avgSold} */}
          </Table.HeaderCell>
        );
      }

      // 補空白欄
      return <Table.HeaderCell key={index}>{total[col.name]}</Table.HeaderCell>;
    });
  };

  return (
    <div>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            {columns.map((col, index) => {
              return (
                <Table.HeaderCell key={index}>
                  {col.label}
                  <br />
                  {col.name}
                </Table.HeaderCell>
              );
            })}
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            {totalRow(columns)}
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
    </div>
  );
}
