import React from 'react';
import { Table, Label, Header, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import numberFormat from '../../../utils/numberFormat';
import { v4 as uuidv4 } from 'uuid';

export default function TableListSmall({ rows, handleEdit }) {
  // console.log(uuidv4())
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
                {/* 第一行 */}
                <Table.Row key={uuidv4()}>
                  <Table.Cell>
                    <Header as="h4">{detailLink(row)}</Header>
                  </Table.Cell>
                  <Table.Cell textAlign='right'>
                    {/* 餘股 */}
                    <Label size="large" circular color="blue">
                      {row.qtys}
                    </Label>
                  </Table.Cell>
                  <Table.Cell textAlign='right'>
                    {/* 損益 */}
                    <Label
                      size="large"
                      color={row.bonus < 0 ? 'green' : 'pink'}
                    >
                      ${row.bonus}
                    </Label>
                  </Table.Cell>
                </Table.Row>
                {/* 第二行 */}
                <Table.Row key={uuidv4()}>
                  <Table.Cell>現值</Table.Cell>

                  <Table.Cell textAlign='right'>
                    {/* 市值 */}
                    {/* #21ba45 green*/}
                    {/* #21c0b3 teal*/}
                    {/* #e03997 pink*/}
                    {/* <span style={{ color: '#21ba45' }}>
                      ${numberFormat(row.amt)}
                    </span> */}

                    {row.amt > row.leftCosts ? (
                      <span style={{ color: '#e03997' }}>
                        ${numberFormat(row.amt)}
                      </span>
                    ) : (
                      <span style={{ color: '#21ba45' }}>
                        ${numberFormat(row.amt)}
                      </span>
                    )}
                    
                  </Table.Cell>
                  <Table.Cell textAlign='right'>
                    {/* 現價 */}
                    <Label                     
                      color={row.price < row.balancePrice ? 'green' : 'pink'}
                      size="large"
                      basic
                      onClick={() => handleEdit(row, index)}
                    >
                      {row.price}
                    </Label>
                  </Table.Cell>
                </Table.Row>
                {/* 第三行 */}
                <Table.Row key={uuidv4()}>
                  <Table.Cell>成本</Table.Cell>
                  <Table.Cell textAlign='right'>
                    {/* 未攤成本 */}
                    <span style={{ color: '#2194dd' }}>
                      ${numberFormat(row.leftCosts)}
                    </span>
                  </Table.Cell>

                  <Table.Cell textAlign='right'>
                    {/* 損益平衡價 */}
                    <Label size="large" basic color="blue">
                      {row.balancePrice}
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
