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
        setRow(cities[0]);
        console.log(cities);
        // console.log('Current cities in CA: ', cities.join(', '));
      });
  }, []);

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
