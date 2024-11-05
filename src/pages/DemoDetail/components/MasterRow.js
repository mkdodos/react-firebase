import React, { useEffect, useState } from 'react';
import schema from '../../DemoMaster/data/schema.json';
import { Table, Statistic } from 'semantic-ui-react';

import { db } from '../../../utils/firebase';
import StockDropdown from './StockDropdown';

export default function MasterRow({ data, stockName,fromDate,toDate }) {
  const [row, setRow] = useState([]);

  // console.log(fromDate)

  useEffect(() => {
    db.collection('master')
      .where('stockName', '==', stockName)
      .where('fromDate', '==', fromDate)
      // .where('toDate', '<=', toDate)
      // .where('fromDate', '==', '2024-11-01')
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
     
        <Statistic size="small">
          <Statistic.Value>{row.qtys}</Statistic.Value>
          <Statistic.Label>餘股</Statistic.Label>
        </Statistic>
        <Statistic size="small">
          <Statistic.Value>{row.avgCost}</Statistic.Value>
          <Statistic.Label>損益平衡價</Statistic.Label>
        </Statistic>
        <Statistic size="small">
          <Statistic.Value>{row.price}</Statistic.Value>
          <Statistic.Label>現價</Statistic.Label>
        </Statistic>
        <Statistic color={row.bonus > 0 ? 'red' : 'green'}>
          <Statistic.Value>{row.bonus}</Statistic.Value>
          <Statistic.Label>預估損益</Statistic.Label>
        </Statistic>

        <Statistic color={row.roi > 0 ? 'red' : 'green'}>
          <Statistic.Value>{row.roi}</Statistic.Value>
          <Statistic.Label>報酬率</Statistic.Label>
        </Statistic>
      

     
    </div>
  );
}
