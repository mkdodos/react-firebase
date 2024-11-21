import React from 'react';
import { Table, Label, Header } from 'semantic-ui-react';

export default function TableListSmall({ rows }) {
  return (
    <>
      <Table unstackable>
        <Table.Body>
          {rows.map((row, index) => {
            return (
              <Table.Row
                key={row.id}
               
              >
                <Table.Cell>
                  <Header as="h4">
                    {row.stockName}
                  </Header>
                  <span>${row.costs}</span>
                  {/* <Label>{row.qtys}</Label> */}
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <Label size="large" color='blue' basic>{row.qtys}</Label>                  
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
