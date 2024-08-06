import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';

export default function GroupView({ rows }) {
  const [groupedRows, setGroupedRows] = useState([]);

  const groupSum = () => {
    var result = [];
    rows.reduce(function (res, obj) {
      if (!res[obj.date]) {
        res[obj.date] = { date: obj.date, amt: 0 };
        result.push(res[obj.date]);
      }
      res[obj.date].amt += Math.round(obj.cost * obj.qty);
      return res;
    }, {});

    setGroupedRows(result);
    // console.log(result);
  };

  useEffect(() => {
    groupSum();
  }, []);

  return (
    <div>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}>日期</Table.HeaderCell>
            <Table.HeaderCell width={2}>小計</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {groupedRows.map((row, index) => {
            return (
              <Table.Row key={row.date}>
                <Table.Cell>{row.date}</Table.Cell>
                <Table.Cell>{row.amt}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
