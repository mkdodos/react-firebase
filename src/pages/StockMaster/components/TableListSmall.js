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
              <>
                <Table.Row key={row.id}>
                  <Table.Cell>
                    <Header as="h4">{detailLink(row)}</Header>
                    <span>${row.costs}</span>
                    {/* <Label>{row.qtys}</Label> */}
                  </Table.Cell>
                  <Table.Cell >
                    <Label size="large" circular color="blue">
                      {row.qtys}
                    </Label>
                  </Table.Cell>
                  {/* <Table.Cell>
                    <Label size="large" color="pink" basic>
                      {row.avgCost}
                    </Label>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <Label size="large" basic color="teal">
                      {row.avgSold}
                    </Label>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <Label size="large" basic>
                      {row.price}
                    </Label>
                  </Table.Cell> */}
                  <Table.Cell>
                    <Label
                      size="large"
                      color={row.bonus < 0 ? 'green' : 'pink'}
                      
                    >
                      ${row.bonus}
                    </Label>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  {/* <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell> */}
                  <Table.Cell textAlign='left'>
                    <Label size="large" color="pink" basic>
                      {row.avgCost}
                    </Label>
                  </Table.Cell>
                  <Table.Cell >
                    <Label size="large" basic color="teal">
                      {row.avgSold}
                    </Label>
                  </Table.Cell>
                  <Table.Cell >
                    <Label size="large" basic>
                      {row.price}
                    </Label>
                  </Table.Cell>
                </Table.Row>
              </>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
