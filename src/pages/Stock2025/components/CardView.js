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
  GridRow,
  GridColumn,
} from "semantic-ui-react";

import { v4 as uuidv4 } from "uuid";

export default function CardView({ state }) {
  const { dataByDate } = state;
  // console.log(state.dataByDate)
  return (
    <div>
      <Grid columns={3} celled>
        <GridRow>
          {dataByDate.map((obj) => (
            <GridColumn  key={uuidv4()}>
              <Table celled>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>{obj.date.slice(5, 10)}</TableHeaderCell>
                    <TableHeaderCell>股數</TableHeaderCell>
                    <TableHeaderCell>單價</TableHeaderCell>
                    <TableHeaderCell> {obj.sum}</TableHeaderCell>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {obj.rows.map((row) => (
                    <TableRow key={uuidv4()}>
                      <TableCell>{row.stockName}</TableCell>
                      <TableCell>
                        {row.inQty ? row.inQty : row.outQty}
                      </TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>{row.amt}</TableCell>
                    </TableRow>
                  ))}
                  {/* <TableRow key={uuidv4()}>
                    <TableCell>1</TableCell> */}

                  {/* </TableRow> */}
                </TableBody>
              </Table>
            </GridColumn>
          ))}
        </GridRow>
      </Grid>
    </div>
  );
}
