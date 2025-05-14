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
                    <TableHeaderCell>{obj.stockName}</TableHeaderCell>
                    <TableHeaderCell>{obj.qtys} 股</TableHeaderCell>
                    <TableHeaderCell>單價</TableHeaderCell>
                    <TableHeaderCell> {numberFormat(obj.sum)}</TableHeaderCell>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {obj.rows.map((row) => (
                    <TableRow key={uuidv4()}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>
                        {row.inQty ? (
                          <Label  size="large" basic  color="red">{row.inQty}</Label>
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
