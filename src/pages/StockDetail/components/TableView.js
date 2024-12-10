import React, { Fragment } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';

export default function TableView({ state, columns, handleEdit, handleAdd }) {
  // console.log(state);
  const { loading, data, total } = state;

  console.log(columns)

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

  const masterRow = (row) => {
    // console.log(row);

    const master = row.masterObj;

    const { costs, minusCosts, qtys } = master;

    // 未攤成本
    const leftCosts = costs - minusCosts;

    // 平均成本 = 未攤成本 / 餘股
    const avgCost =Math.round(leftCosts / qtys);

    // 應攤成本 = 平均成本  * 售出股數

    // 這個值要寫入資料庫,日後刪除時,用此值回復主表已攤成本
    // const minusCost = avgCost * row.outQty;

    return (
      <Table.Row key={uuidv4()} positive>
        {/* <Table.Cell>costs{costs}</Table.Cell>
        <Table.Cell>minusCosts{minusCosts}</Table.Cell> */}
        {/* <Table.Cell>leftCosts{leftCosts}</Table.Cell> */}
        <Table.Cell>qtys{qtys}</Table.Cell>
        <Table.Cell colSpan='8'>avgCost{avgCost}</Table.Cell>
        {/* <Table.Cell>outQty{row.outQty}</Table.Cell> */}
        {/* <Table.Cell>minusCost{minusCost}</Table.Cell> */}
      </Table.Row>
      // <Table.Row key={uuidv4()}>
      //   <Table.Cell>costs{row.masterObj?.costs}</Table.Cell>
      //   <Table.Cell>minusCosts{row.masterObj?.minusCosts}</Table.Cell>
      //   <Table.Cell>inQtys{row.masterObj?.inQtys}</Table.Cell>
      //   <Table.Cell>outQtys{row.masterObj?.outQtys}</Table.Cell>
      //   <Table.Cell>qtys{row.masterObj?.qtys}</Table.Cell>
      //   <Table.Cell>outQty{row.outQty}</Table.Cell>
      //   <Table.Cell>{row.outQty}</Table.Cell>
      // </Table.Row>
    );
  };

  return (
    <div>
      bonus = (price - avgCost) * outQty;
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
              // 因為要加入key,需要將<>改成<Fragment>
              <Fragment key={row.id}>
                <Table.Row>
                  {columns.map((col, index) => {
                    return <Table.Cell key={index}>{row[col.name]}</Table.Cell>;
                  })}
                  <Table.Cell>
                    <Button onClick={() => handleEdit(row, index)}>編輯</Button>
                  </Table.Cell>
                </Table.Row>
                { row.outQty &&  masterRow(row)}
              </Fragment>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
