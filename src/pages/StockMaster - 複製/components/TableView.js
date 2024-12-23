import React, { useState } from 'react';
import { Table, Button, Label } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import numberFormat from '../../../utils/numberFormat';
import StockPrice from './StockPrice';

export default function TableView({
  state,
  columns,
  handleAdd,
  handleEdit,
  dispatch,
}) {
  const { data, loading, direction, column, total } = state;

  console.log(data);

  // 針對不同欄位做不同顯示
  const genColumn = (row, column) => {
    let color = 'green';
    if (row[column.name] > 0) color = 'pink';
    switch (column.name) {
      case 'stockName':
        // 連至該股票的明細頁
        // 以股名為條件會包含已結束的明細也出現
        // 需要增加開始結束日條件,(>=開始日 and <=結束日)
        // 進行中的資料沒有結束日,則以>=開始日
        // 先判斷有無結束
        // 有 :　>=開始日 and <=結束日
        // 無 :  >=開始日
        // 產生不同路由,取得相關條件資料
        //  <Route path="/demo-detail/:stockName" element={<DemoDetail />} />

        return (
          <NavLink
            to={
              '/stock-detail/' +
              row[column.name] +
              '/fromDate/' +
              row.fromDate +
              '/toDate/' +
              row.toDate
            }
          >
            {row[column.name]}
          </NavLink>
        );

      case 'bonus':
        return (
          <Label size="large" basic color={color}>
            {numberFormat(row[column.name])}
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

  // 合計列
  const totalRow = (columns) => {
    return columns.map((col, index) => {
      if (!col.viewable) return;
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
      <Table celled unstackable sortable striped>
        <Table.Header>
          <Table.Row>
            {totalRow(columns)}

            <Table.HeaderCell>
              <StockPrice />
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            {columns.map((col, index) => {
              if (!col.viewable) return;
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
                  if (!col.viewable) return;
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
