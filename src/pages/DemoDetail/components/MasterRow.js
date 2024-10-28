import React, { useEffect, useState } from 'react';
import schema from '../../DemoMaster/data/schema.json';
import { Table } from 'semantic-ui-react';

import { db } from '../../../utils/firebase';
import StockDropdown from './StockDropdown';

export default function MasterRow({ data, stockName }) {
  const [row, setRow] = useState([]);

  useEffect(() => {
    db.collection('master')
      .where('stockName', '==', stockName)
      .onSnapshot((querySnapshot) => {
        var cities = [];
        querySnapshot.forEach((doc) => {
          cities.push(doc.data());
        });
        // setRow(cities[0]);
        setRow(calColumns(cities[0]));
        console.log(cities);
        // console.log('Current cities in CA: ', cities.join(', '));
      });
  }, []);

  // 計算欄位
  const calColumns = (obj) => {
    const { qtys, price, costs, outQtys, soldAmt } = obj;

    let avgCost = 0;

    if (qtys > 0) {
      avgCost = Math.round(((costs - soldAmt) / qtys) * 100) / 100; //損益平衡價
    }

    // 依是否全部售完做不同損益計算
    let bonus = 0;
    if (qtys == 0) {
      bonus = soldAmt - costs;
    } else {
      bonus = Math.round((price - avgCost) * qtys);
    }

    return {
      ...obj,
      avgCost,
      bonus,
      roi: Math.round((bonus / costs) * 10000) / 100,
    };
  };

  // 欄位資料(篩選屬性為可視欄位)
  const getColumns = () => {
    let columns = schema.columns;
    columns = columns.filter((col) => col.viewable);
    return columns;
  };

  // 表格和表單所需的欄位資料
  const columns = getColumns();

  // console.log(data);
  return (
    <div>
      <Table celled unstackable sortable>
        <Table.Header>
          <Table.Row>
            {columns.map((col, index) => {
              return (
                <Table.HeaderCell key={index}>{col.label}</Table.HeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            {data &&
              columns.map((column, index) => {
                return <Table.Cell key={index}>{row[column.name]}</Table.Cell>;
              })}
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
