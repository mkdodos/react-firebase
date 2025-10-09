import React from "react";
import {
  CardGroup,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "semantic-ui-react";

import { v4 as uuidv4 } from "uuid";

export default function DayView({ state }) {
  const { data } = state;
  data.sort((a, b) => (a.date < b.date ? 1 : -1));
  // console.log(state.data)
  const GroupByDay = Object.groupBy(data, (keys) => keys.date);

  console.log(GroupByDay);
  //   console.log(GroupByDay.keys);
  const abc = Object.keys(GroupByDay);
  console.log(abc);

  const card = (date) => {
    // console.log(GroupByDay[date]);
    return (
      <Card key={uuidv4()}>
        <CardContent>
          <CardHeader>{date}</CardHeader>

          <Table celled unstackable>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>玩家</TableHeaderCell>
                <TableHeaderCell>角色</TableHeaderCell>
                <TableHeaderCell>分數</TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {GroupByDay[date]
                .sort((a, b) => (Number(a.score) < Number(b.score) ? 1 : -1))
                .map((obj, i) => {
                  return (
                    <TableRow key={uuidv4()}>
                      <TableCell>
                        {obj.playerText}&nbsp;
                        {i === 0 && <Icon name="street view" />}
                      </TableCell>
                      <TableCell>{obj.roleText}</TableCell>
                      <TableCell>{obj.score}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <CardGroup>
        {abc.map((obj) => {
          return card(obj);
        })}
      </CardGroup>
    </>
  );
}
