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

export default function CardView({ data, dispatch, groupKey,loading }) {
  
  return (
    <div>
      <Button loading={loading} icon="refresh" onClick={() => dispatch({ type: "LOAD" })} />
      <Grid stackable doubling columns={3} celled>
        <GridRow>
          {data.map((obj) => (
            <GridColumn key={uuidv4()}>
              <Table unstackable>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>
                      {groupKey == "date" ? obj.date.slice(5, 10) : obj.date}
                    </TableHeaderCell>
                    <TableHeaderCell>
                      {groupKey == "date" ? numberFormat(obj.sum) : "金額"}
                    </TableHeaderCell>
                    <TableHeaderCell>成本</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {obj.rows.map((row) => (
                    <TableRow key={uuidv4()}>
                      <TableCell>
                        {groupKey == "date" ? row.itemName : row.date}
                      </TableCell>
                      <TableCell>{numberFormat(row.amt)}</TableCell>
                      <TableCell>{numberFormat(row.cost)}</TableCell>
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
