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

export default function CardView({ data, dispatch, groupKey, loading }) {
  const handleArchive = (obj) => {
    dispatch({ type: "ARCHIVE", payload: obj });
  };
  return (
    <div>
      <Button
        loading={loading}
        icon="refresh"
        onClick={() => dispatch({ type: "LOAD" })}
      />
      <Grid stackable doubling columns={3} celled>
        <GridRow>
          {data.map((obj) => (
            <GridColumn key={uuidv4()}>
              <Table unstackable>
                <TableHeader>
                  <TableRow>
                    {/* 不同群組的資料顯示 */}
                    <TableHeaderCell>
                      {groupKey == "date"
                        ? obj.date.slice(5, 10)
                        : obj.stockName}
                    </TableHeaderCell>
                    {/* 股數為0時顯示封存按鈕 */}
                    <TableHeaderCell>
                      {groupKey == "date" ? (
                        "股數"
                      ) : obj.sumQty != 0 ? (
                        obj.sumQty + " 股"
                      ) : (
                        <Button
                          onClick={() => handleArchive(obj)}
                          color="teal"
                          icon="file archive outline"
                        />
                      )}
                    </TableHeaderCell>
                    <TableHeaderCell>單價</TableHeaderCell>
                    <TableHeaderCell>{numberFormat(obj.sum)}</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {obj.rows.map((row) => (
                    <TableRow key={uuidv4()}>
                      <TableCell>
                        {groupKey == "date" ? row.stockName : row.date}
                      </TableCell>
                      {/* 顯示買入或賣出數量 */}
                      <TableCell>
                        {row.inQty ? (
                          <Label size="large" basic color="red">
                            {row.inQty}
                          </Label>
                        ) : (
                          <Label size="large" basic color="green">
                            {row.outQty}
                          </Label>
                        )}
                      </TableCell>
                      <TableCell>{numberFormat(row.price)}</TableCell>
                      <TableCell>{numberFormat(row.amt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </GridColumn>
          ))}
        </GridRow>
      </Grid>
    </div>
  );
}
