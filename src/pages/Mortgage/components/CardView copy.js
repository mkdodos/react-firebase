import React from "react";
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

export default function CardView({ state, columns }) {
  console.log(columns);
  // 群組迴圈
  const genCards = () => {
    const groups = [];
    Object.keys(state.groupData).forEach(function (key, i) {
      // 個別第一筆餘額
      //   console.log(data60[key][0].balance);
      // 一個群組一張卡片

      groups.push(
        <GridColumn key={i}>
          <Card>
            <CardContent>
              <CardHeader>{state.groupData[key][0].balance}</CardHeader>

              <Table celled unstackable>
                <TableHeader>
                  <TableRow>
                    {columns.map((col, index) => {
                      return (
                        <TableHeaderCell key={index}>
                          {col.title}
                        </TableHeaderCell>
                      );
                    })}

                    {/* <TableHeaderCell>Header</TableHeaderCell>
                    <TableHeaderCell>Header</TableHeaderCell> */}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {state.groupData[key].map((row, rowIndex) => {
                    return (
                      <TableRow>
                        {columns.map((col, index) => {
                          return (
                            <TableCell key={index}>
                              {row[col.dataKey]}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                    {
                      /* return columns.map((col, index) => {
                        return (
                          <TableCell key={index}>{row[col.dataKey]}</TableCell>
                        );
                      });
                    })
                    </TableRow> */
                    }
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </GridColumn>
      );

      // 個別群組資料陣列
      // console.log(data60[key])
      // console.log(data60[key][0])
    });
    return groups;
  };

  return (
    <Grid columns={2}>
      <GridRow>{genCards()}</GridRow>
    </Grid>
  );
  // 用 grid 讓多個卡片在同一列
  //   return <div>{genCards()}</div>;
}
