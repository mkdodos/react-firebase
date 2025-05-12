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
} from "semantic-ui-react";

export default function CardView({ state }) {
  console.log(state.dataByDate);
  const genCards = () => {
    let cards = [];
    for (const [key, value] of Object.entries(state.dataByDate)) {
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

  return <>{genCards()}</>;
}
