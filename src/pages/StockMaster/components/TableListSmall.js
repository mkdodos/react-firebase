import React from 'react';
import { Table, Label, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function TableListSmall({ rows }) {
  // 明細連結
  const detailLink = (row) => {
    return (
      <NavLink
        to={
          '/stock-detail/' +
          row.stockName +
          '/fromDate/' +
          row.fromDate +
          '/toDate/' +
          row.toDate
        }
      >
        {row.stockName}
      </NavLink>
    );
  };

  return (
    <>
      <Table unstackable>
        <Table.Body>
          {rows.map((row, index) => {
            return (
              <Table.Row key={row.id}>
                <Table.Cell>
                  <Header as="h4">{detailLink(row)}</Header>
                  <span>${row.costs}</span>
                  {/* <Label>{row.qtys}</Label> */}
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <Label size="large" color="blue" basic>
                    {row.qtys}
                  </Label>
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <Label size="large">{row.avgCost}</Label>
                </Table.Cell>
                <Table.Cell>
                  <Label
                    size="large"
                    color={row.bonus < 0 ? 'green' : 'pink'}
                    basic
                  >
                    ${row.bonus}
                  </Label>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
