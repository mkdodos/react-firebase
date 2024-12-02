import React, { useState } from 'react';
import { Table, Button, Label } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import numberFormat from '../../../utils/numberFormat';

export default function TableView({
  state,
  columns,
  handleAdd,
  handleEdit,
  dispatch,
}) {
  let { data, loading, direction, column, total } = state;

  // const columnSwitch = 'inQty';
  // const columnSwitch = 'outQty';
  const [columnSwitch, setColumnSwitch] = useState('');

  const switchClick = () => {
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

  const priceHeader = () => {
    if (columnSwitch == 'inQty') {
      return total.avgCost;
    }
    if (columnSwitch == 'outQty') {
      return total.avgSold;
    }

    return (
      <>
        <span style={{color:'#e03997'}}>{total.avgCost}</span>
        <br />
        <span style={{color:'#21c0b3'}}>{total.avgSold}</span>
      </>
    );

    {
      /* {columnSwitch == 'inQty' && total.avgCost}
            {columnSwitch == 'outQty' && total.avgSold}
            {columnSwitch == '' && '買' + total.avgCost + '賣' + total.avgSold}
            {columnSwitch == '' && total.avgCost + '/' + total.avgSold} */
    }

    return 'abc';
  };

  // 合計列
  const totalRow = (columns) => {
    return columns.map((col, index) => {
      if (col.name == 'transDate') {
        return (
          <Table.HeaderCell>
            {/* <Button onClick={() => dispatch({ type: 'LOAD' })}>載入全部</Button> */}
            <Button
              onClick={() => {
                dispatch({ type: 'LOAD' });
                setColumnSwitch('');
              }}
            >
              載入全部
            </Button>
          </Table.HeaderCell>
        );
      }

      if (col.name == 'inQty') {
        return (
          <Table.HeaderCell>
            {total.inQty}
            {/* <br />
            {total.avgCost} */}
          </Table.HeaderCell>
        );
      }
      if (col.name == 'outQty') {
        return (
          <Table.HeaderCell>
            {total.outQty}
            {/* <br />
            {total.avgSold} */}
          </Table.HeaderCell>
        );
      }
      if (col.name == 'price') {
        return (
          <Table.HeaderCell>
            {priceHeader()}
            {/* {columnSwitch == 'inQty' && total.avgCost}
            {columnSwitch == 'outQty' && total.avgSold}
            {columnSwitch == '' && '買' + total.avgCost + '賣' + total.avgSold}
            {columnSwitch == '' && total.avgCost + '/' + total.avgSold} */}
          </Table.HeaderCell>
        );
      }

      if (col.name == 'amt') {
        if (columnSwitch == '')
          return <Table.HeaderCell>{total.amt}</Table.HeaderCell>;
        return <Table.HeaderCell></Table.HeaderCell>;
      }
      // 補空白欄
      return <Table.HeaderCell key={index}>{total[col.name]}</Table.HeaderCell>;
    });
  };

  let headerColor = 'green';

  return (
    <>
      <Button onClick={switchClick}>切換買賣</Button>
      <Table celled unstackable sortable>
        <Table.Header>
          <Table.Row>
            {columns.map((col, index) => {
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
                  <span style={{ color: col.color }}>{col.label}</span>
                </Table.HeaderCell>
              );
            })}
            <Table.HeaderCell>
              {/* <Button primary onClick={handleAdd} loading={loading}>
                新增
              </Button> */}
            </Table.HeaderCell>
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
              <Table.Row key={row.id}>
                {columns.map((col, index) => {
                  return (
                    <Table.Cell key={index}>
                      {genColumn(row, col, data[rowIndex - 1])}
                    </Table.Cell>
                  );
                })}
                <Table.Cell>
                  <Button onClick={() => handleEdit(row, rowIndex)}>
                    編輯
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
