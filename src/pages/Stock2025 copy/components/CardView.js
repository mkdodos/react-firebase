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
  Menu,
  Table,
  Grid,
  GridRow,
  GridColumn,
  Label,
} from "semantic-ui-react";

import { v4 as uuidv4 } from "uuid";
import numberFormat from "../../../utils/numberFormat";

export default function CardView({ data }) {
  // const { dataByDate } = state;
  // console.log(state.dataByDate)
  return (
    <div>
      <Grid stackable doubling columns={3} celled>
        <GridRow>
          {data.map((obj) => (
            <GridColumn key={uuidv4()}>
              <Table  unstackable>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>{obj.date.slice(5, 10)}</TableHeaderCell>
                    <TableHeaderCell>股數</TableHeaderCell>
                    <TableHeaderCell>單價</TableHeaderCell>
                    <TableHeaderCell> {numberFormat(obj.sum)}</TableHeaderCell>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {obj.rows.map((row) => (
                    <TableRow key={uuidv4()}>
                      <TableCell>{row.stockName}</TableCell>
                      <TableCell>
                        {row.inQty ? (
                          <Label size="large" basic color="red">{row.inQty}</Label>
                        ) : (
                          <Label size="large" basic color="green">{row.outQty}</Label>
                        )}
                      </TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>{numberFormat(row.amt)}</TableCell>
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
