import React, { Fragment, useState } from 'react';
import { Table, Button, Label } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';
import numberFormat from '../../../utils/numberFormat';

export default function TableView({
  dispatch,
  state,
  columns,
  handleEdit,
  handleAdd,
}) {
  // console.log(state);
  let { loading, data, total } = state;

  // console.log(columns)




  const handleDateClick = (date) => {
    dispatch({ type: 'FILTER', payload: { date } });
    console.log(date);
  };

  // 針對不同欄位做不同顯示
  const genColumn = (row, column, prevRow) => {
    switch (column.name) {
      case 'amt':
        return numberFormat(row[column.name]);
      case 'price':
        return numberFormat(row[column.name]);
      case 'transDate':
        // 和前一筆相同時用灰色顯示
        const prev = prevRow?.transDate;
        const isSame = row[column.name] == prev;             
        if (isSame) return <Label size="large">{row[column.name]}</Label>;

        return (
          <Label
            color="teal"
            onClick={() => handleDateClick(row.transDate)}
            size="large"
          >
            {row[column.name]}
          </Label>
        );
      default:
        return row[column.name];
    }
  };

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

      if (col.name == 'amt') {
        return (
          // 依顯示買或賣欄位顯示相關合計
          <Table.HeaderCell key={index}>
            {columnSwitch == 'inQty' && total.inAmt}
            {columnSwitch == 'outQty' && total.outAmt}
            {columnSwitch == '' && total.amt}
          </Table.HeaderCell>
        );
      }

      // 補空白欄
      return <Table.HeaderCell key={index}>{total[col.name]}</Table.HeaderCell>;
    });
  };

  // 控制顯示主表資料列
  const [masterRowSwitch, setMasterRowSwitch] = useState(false);
  // 主表資料列
  const masterRow = (row) => {
    // console.log(row);

    const master = row.masterObj;

    const { costs, minusCosts, qtys } = master;

    // 未攤成本
    const leftCosts = costs - minusCosts;

    // 平均成本 = 未攤成本 / 餘股
    const avgCost = Math.round((leftCosts / qtys) * 100) / 100;

    // 應攤成本 = 平均成本  * 售出股數

    // 這個值要寫入資料庫,日後刪除時,用此值回復主表已攤成本
    // const minusCost = avgCost * row.outQty;

    return (
      <Table.Row key={uuidv4()} positive>
        {/* <Table.Cell>costs{costs}</Table.Cell>
        <Table.Cell>minusCosts{minusCosts}</Table.Cell> */}
        {/* <Table.Cell>leftCosts{leftCosts}</Table.Cell> */}
        <Table.Cell>qtys{qtys}</Table.Cell>
        <Table.Cell colSpan="8">avgCost{avgCost}</Table.Cell>
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

  // 控制顯示買入或賣出欄位
  const [columnSwitch, setColumnSwitch] = useState('');

  const handleSwitchClick = () => {
    if (columnSwitch == 'inQty') setColumnSwitch('outQty');
    else setColumnSwitch('inQty');
  };

  // 買入
  if (columnSwitch == 'inQty') {
    data = data.filter((row) => row.inQty != '');
    columns = columns.filter((col) => col.name != 'outQty');
  }

  // 賣出
  if (columnSwitch == 'outQty') {
    data = data.filter((row) => row.outQty != '');
    columns = columns.filter((col) => col.name != 'inQty');
  }

  return (
    <div>
      bonus = (price - avgCost) * outQty
      <Button toggle active={masterRowSwitch} onClick={()=>setMasterRowSwitch(!masterRowSwitch)}>
        主表資料
      </Button>
      <Button onClick={handleSwitchClick}>切換買賣</Button>
      <Button
        onClick={() => {
          dispatch({ type: 'LOAD' });
          setColumnSwitch('');
        }}
      >
        載入全部
      </Button>
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
          {data.map((row, rowIndex) => {
            return (
              // 因為要加入key,需要將<>改成<Fragment>
              <Fragment key={row.id}>
                <Table.Row>
                  {columns.map((col, index) => {
                    return (
                      <Table.Cell key={index}>
                        {genColumn(row, col, data[rowIndex - 1])}
                      </Table.Cell>
                    );
                    // return <Table.Cell key={index}>{row[col.name]}</Table.Cell>;
                  })}
                  <Table.Cell>
                    <Button onClick={() => handleEdit(row, rowIndex)}>編輯</Button>
                  </Table.Cell>
                </Table.Row>
                {masterRowSwitch && row.masterObj && row.outQty && masterRow(row)}
              </Fragment>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
