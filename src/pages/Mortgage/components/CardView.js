import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Grid,
  GridRow,
  GridColumn,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "semantic-ui-react";

import { v4 as uuidv4 } from "uuid";

export default function CardView({ state }) {
  console.log(state.groupData);
  // 資料架構
  // const data = {
  //     itemA:[],
  //     itemB:[]
  // }
  const data = state.groupData;
  // 1個項目1張卡片
  const genCards = () => {
    const cards = [];
    Object.keys(data).forEach((key) => {
      cards.push(
        <GridColumn key={uuidv4()}>
          <Card>
            <CardContent>
              <CardHeader>{data[key][0].balance}</CardHeader>
            </CardContent>
            <CardContent extra>{genTable(data[key])}</CardContent>
          </Card>
        </GridColumn>
      );
    });
    return cards;
  };

  const genTable = (data) => {
    return (
      <Table celled unstackable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>日期</TableHeaderCell>
            <TableHeaderCell>金額</TableHeaderCell>
            <TableHeaderCell>餘額</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row) => {
            return (
              <TableRow key={uuidv4()}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.amt}</TableCell>
                <TableCell>{row.balance}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  return (
    <Grid columns={2}>
      <GridRow>{genCards(data)}</GridRow>
    </Grid>
  );
}
