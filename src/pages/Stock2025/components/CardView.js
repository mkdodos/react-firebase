import {
  Card,
  CardHeader,
  CardContent,
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  MenuItem,
  Icon,
  Label,
  Menu,
  Table,
  Grid,
} from "semantic-ui-react";

import { v4 as uuidv4 } from "uuid";

export default function CardView({ state }) {
  const { dataByDate } = state;

  //   return;
  //   console.log(state.dataByDate);
  const genCards = () => {
    let cards = [];
    for (const [key, value] of Object.entries(dataByDate)) {
      console.log(key);
      cards.push(
        <Card key={key}>
          <CardContent>
            <CardHeader>{key}</CardHeader>
          </CardContent>
          <CardContent extra>
            <Table celled>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>名稱</TableHeaderCell>
                  <TableHeaderCell>股數</TableHeaderCell>
                  <TableHeaderCell>單價</TableHeaderCell>
                  <TableHeaderCell>小計</TableHeaderCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {genRows(value)}
                {/* <TableRow>
                  <TableCell>Cell</TableCell>
                </TableRow> */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      );

      //   value.map(v=>console.log(key,v.stockName))
    }
    return cards;
  };

  const genRows = (data) => {
    let rows = [];
    data.map((obj, index) =>
      rows.push(
        <TableRow key={index}>
          <TableCell>{obj.stockName}</TableCell>
          <TableCell>{obj.inQty ? obj.inQty : obj.outQty}</TableCell>
          <TableCell>{obj.price}</TableCell>
          <TableCell>{obj.amt}</TableCell>
        </TableRow>
      )
    );
    return rows;
  };

  // 依欄數組合每幾天一列
  const dayRows = (columnsCount) => {
    const output = [];
    // for (let i = 0; i < dataByDate.length; i++) {
    //   if (i % columnsCount == 0)
    //     output.push(<Grid.Row key={i}>A</Grid.Row>);
    // }

    let i = 0;
    for (const [key, value] of Object.entries(dataByDate)) {
      if (i % columnsCount == 0)
        output.push(
          <Grid.Row key={key}>{dayColumns(i, columnsCount)}</Grid.Row>
        );
      i++;
    }

    return output;
  };

  // 組合每一列的欄位資料
  const dayColumns = (index, columnsCount) => {
    let dd = [];

    let rows = [];

    Object.entries(dataByDate)
      .slice(index, index + columnsCount)
      .map(
        (
          entry //console.log(entry)
        ) =>
          dd.push(
            <Grid.Column key={uuidv4()}>
              {/* {entry[1][0].stockName} */}
              {/* {entry[1].map(obj=>console.log(obj.stockName))} */}

              <Table celled>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>
                      {entry[1][0].date.slice(5, 10)}
                    </TableHeaderCell>
                    <TableHeaderCell>股數</TableHeaderCell>
                    <TableHeaderCell>單價</TableHeaderCell>
                    <TableHeaderCell>小計</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <Table.Body>
                  {entry[1].map((obj) => (
                    <TableRow key={index}>
                      <TableCell>{obj.stockName}</TableCell>
                      <TableCell>
                        {obj.inQty ? obj.inQty : obj.outQty}
                      </TableCell>
                      <TableCell>{obj.price}</TableCell>
                      <TableCell>{obj.amt}</TableCell>
                    </TableRow>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
          )
      );

    return dd;
  };

  return (
    <>
      <Grid columns={3}>{dayRows(3)}</Grid>
    </>
  );
}
