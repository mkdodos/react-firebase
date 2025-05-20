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
  Button,
} from "semantic-ui-react";

import { v4 as uuidv4 } from "uuid";
import numberFormat from "../../../utils/numberFormat";

export default function CardView({ data, dispatch }) {
  // const { dataByDate } = state;
  console.log(data);
  //   return
  return (
    <div>
      <Button icon="refresh" onClick={() => dispatch({ type: "LOAD" })} />
      <Grid stackable doubling columns={3} celled>
        <GridRow>
          {data.map((obj) => (
            <GridColumn key={uuidv4()}>
              <Table unstackable>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>{obj.date.slice(5, 10)}</TableHeaderCell>

                    <TableHeaderCell> {numberFormat(obj.sum)}</TableHeaderCell>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {obj.rows.map((row) => (
                    <TableRow key={uuidv4()}>
                      <TableCell>{row.itemName}</TableCell>
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
