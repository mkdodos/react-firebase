import React from 'react';
import { Table, Label, Header } from 'semantic-ui-react';

export default function TableListSmall({ rows, onRowClick }) {
  return (
    <>
      <Table unstackable>
        <Table.Body>
          {rows.map((row, index) => {
            return (
              <Table.Row
                key={row.id}
                onClick={() => {
                  onRowClick(row, index);
                }}
              >
                <Table.Cell>
                  <Header as="h4">
                    {row.stockNo} {row.stockName}
                  </Header>
                  <span>成本:{row.costs}</span>
                  {/* <Label>{row.qtys}</Label> */}
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <Label size="large">{row.qtys} 股</Label>
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
