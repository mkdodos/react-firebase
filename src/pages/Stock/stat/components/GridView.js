import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import { db } from '../../../../utils/firebase';

export default function GridView() {
  const [rows, setRows] = useState([]);

  const fetchStatData = async () => {
    const snapshot = await db.collection('stockStat').get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    // 依股票代號排序
    data.sort((a, b) => {
      return a.stockId > b.stockId ? 1 : -1;
    });

    setRows(data);
  };

  useEffect(() => {
    fetchStatData();
  }, []);
  return (
    <div>
      <Table sortable striped unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={4}>名稱</Table.HeaderCell>
            <Table.HeaderCell width={4}>成本金額</Table.HeaderCell>
            <Table.HeaderCell width={4}>股數</Table.HeaderCell>
            <Table.HeaderCell width={4}>平均價格</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows?.map((row, index) => {
            return (
              <Table.Row key={row.id}>
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>{row.amt}</Table.Cell>
                <Table.Cell>{row.qtys}</Table.Cell>
                <Table.Cell>{Math.round(row.amt/row.qtys*100)/100}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
