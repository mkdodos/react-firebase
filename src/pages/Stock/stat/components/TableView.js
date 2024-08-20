import React, { useState } from 'react';
import { Table, Button, Label } from 'semantic-ui-react';

export default function TableView({
  rows,
  setStatRows,
  handleAdd,
  handleEdit,
  allStockAmt,
  handleRowClick,
}) {
  const style1 = {
    color: 'red',
  };

  const [column, setColumn] = useState('stockId');
  const [direction, setDirection] = useState('ascending');

  const handleSort = (columnName) => {
    setColumn(columnName);
    // 同一欄位重複按,改變排序
    // 先判斷是否同一欄位
    if (column == columnName) {
      setDirection(direction == 'ascending' ? 'descending' : 'ascending');
      setStatRows(rows.slice().reverse());
    } else {
      setDirection('ascending');
      // 排序
      const data = rows.slice().sort((a, b) => {
        return a[columnName] > b[columnName] ? 1 : -1;
      });
      setStatRows(data);
    }
  };

  return (
    <>
     
      <Table sortable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column == 'stockId' ? direction : null}
              width={2}
              onClick={() => handleSort('stockId')}
            >
              股票代號
            </Table.HeaderCell>
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
            {/* 報酬率 */}
            <Table.HeaderCell
              sorted={column == 'bonusPercent' ? direction : null}
              width={2}
              onClick={() => handleSort('bonusPercent')}
            >
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
                  {row.stockId}
                </Table.Cell>
                <Table.Cell onClick={() => handleRowClick(row)}>
                  {row.name}
                </Table.Cell>
                <Table.Cell>{Math.round(row.totalPrice)}</Table.Cell>
                <Table.Cell>{Math.round(row.totalCost)}</Table.Cell>

                <Table.Cell style={{ color: row.bonusColor }}>
                  {row.bonus > 0 && '+'}
                  {Math.round(row.bonus)}
                </Table.Cell>

                <Table.Cell>
                  <Label basic size="large" color={row.bonusColor}>
                    {Math.round(row.bonusPercent * 10000) / 100} %
                  </Label>
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
    </>
  );
}
