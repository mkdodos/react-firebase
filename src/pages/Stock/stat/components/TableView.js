import React from 'react';
import { Table, Button } from 'semantic-ui-react';

export default function TableView({
  rows,
  handleAdd,
  handleEdit,
  allStockAmt,
  handleRowClick,
}) {
  return (
    <div>
      <Table unstackable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}>股票名稱</Table.HeaderCell>

            <Table.HeaderCell width={1}>
              市值<br></br>
              {Math.round(allStockAmt.price)}
            </Table.HeaderCell>
            <Table.HeaderCell width={1}>
              成本<br></br>
              {Math.round(allStockAmt.cost)}
            </Table.HeaderCell>
           
            <Table.HeaderCell width={1}>
              損益
              <br></br>
              {Math.round(allStockAmt.bonus)}
            </Table.HeaderCell>
            <Table.HeaderCell width={2}>
              {Math.round(allStockAmt.bonusPercent * 10000) / 100} %
            </Table.HeaderCell>
            <Table.HeaderCell width={1}>股數</Table.HeaderCell>
            <Table.HeaderCell width={1}>平均成本</Table.HeaderCell>
            <Table.HeaderCell width={1}>現價</Table.HeaderCell>

            <Table.HeaderCell width={4}>
              <Button primary onClick={handleAdd}>
                新增
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows?.map((row, index) => {
            return (
              <Table.Row key={row.id}>
                <Table.Cell onClick={() => handleRowClick(row)}>
                  {row.name}
                </Table.Cell>
                <Table.Cell>{Math.round(row.totalPrice)}</Table.Cell>
                <Table.Cell>{Math.round(row.totalCost)}</Table.Cell>
               
                <Table.Cell>{Math.round(row.bonus)}</Table.Cell>
                <Table.Cell>
                  {Math.round(row.bonusPercent * 10000) / 100} %
                </Table.Cell>
                {/* <Table.Cell>{row.bonusPercent*100}</Table.Cell> */}
                <Table.Cell>{row.qtys} 股</Table.Cell>
                <Table.Cell>{Math.round(row.avgCost * 100) / 100}</Table.Cell>
                <Table.Cell>{row.price}</Table.Cell>

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
