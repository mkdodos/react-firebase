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
  StatisticValue,
  StatisticLabel,
  Statistic,
  Segment,
  Header,
} from "semantic-ui-react";

import numberFormat from "../../../utils/numberFormat";
import { v4 as uuidv4 } from "uuid";

export default function CardView({ state }) {
  // 資料架構
  // const data = {
  //     itemA:[],
  //     itemB:[]
  // }
  const data = state.groupData;
  // 1個項目1張卡片
  const genCards = () => {
    const cards = [];
    let total = 0;

    Object.keys(data).forEach((key) => {
      const balance = data[key][0].balance;
      total += Number(balance);
      cards.push(
        <GridColumn key={uuidv4()}>
          <Card>
            <CardContent>
              <CardHeader>{numberFormat(balance)}</CardHeader>
            </CardContent>
            <CardContent extra>{genTable(data[key])}</CardContent>
          </Card>
        </GridColumn>
      );
    });
    // <GridRow>{genCards(data)}</GridRow>
    return (
      <>
        {/* <GridRow>
          <Statistic size="small">
            <StatisticValue> {numberFormat(total)}</StatisticValue>
            <StatisticLabel>total</StatisticLabel>
          </Statistic>
        </GridRow> */}
        <GridRow>
          <GridColumn>
            <Segment textAlign="center">
              <Statistic size="small">
                <StatisticValue>{numberFormat(total)}</StatisticValue>
              </Statistic>
            </Segment>
          </GridColumn>
        </GridRow>

        <GridRow columns={2}>{cards}</GridRow>
      </>
    );
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
    <>
      <Grid>
        {genCards(data)}
        {/* <GridRow>{genCards(data)}</GridRow> */}
      </Grid>
    </>
  );
}
