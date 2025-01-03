import React from 'react';
import { Table, Button, Label } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import numberFormat from '../../../utils/numberFormat';

export default function TableView({
  columns,
  rows,
  handleEdit,
  handleAdd,
  state,
  dispatch,
}) {
  // 針對不同欄位做不同顯示
  const genColumn = (row, column, index) => {
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
              '/demo-detail/' +
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

      // return (
      //   <NavLink to={'/demo-detail/' + row[column.name]}>
      //     {row[column.name]}{row.toDate}
      //   </NavLink>
      // );

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

  const { direction, loading, column, total } = state;

  return (
    <Table celled unstackable sortable>
      <Table.Header>
        <Table.Row>
          {columns.map((col, index) => {
            return (
              <Table.HeaderCell
                sorted={column == col.name ? direction : null}
                onClick={() =>
                  dispatch({
                    type: 'SORT',
                    payload: { column: col.name, type: col.type },
                  })
                }
                key={index}
              >
                {col.label}
              </Table.HeaderCell>
            );
            // return <Table.HeaderCell key={index}>{col.label}</Table.HeaderCell>;
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

                // return <Table.Cell key={index}>{row[column.name]}</Table.Cell>;
              })}
              <Table.Cell>
                <Button onClick={() => handleEdit(row, index)}>編輯</Button>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
