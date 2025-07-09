// 年月群組金額
import {
  GridRow,
  GridColumn,
  Grid,
  Header,
  HeaderContent,
  HeaderSubheader,
  Label,
} from "semantic-ui-react";
import numberFormat from "../../../utils/numberFormat";

export default function GroupedYM({ data }) {
  console.log(data);
  const columns = [
    {
      title: "年-月",
      dataKey: "ym",
    },
    {
      title: "金額",
      dataKey: "sum",
    },
  ];
  return (
    <div>
      <Grid relaxed columns={3} divided='vertically'>
        {data.map((row, rowIndex) => {
          return (
            <GridRow key={rowIndex}>
              <GridColumn></GridColumn>

              <GridColumn verticalAlign="top">
                <Header as="h3">
                  <HeaderContent>
                    <Label size="large">{row.ym.substring(5, 9)}</Label>
                  </HeaderContent>
                </Header>
              </GridColumn>
              <GridColumn verticalAlign="middle">
                <Header as="h3">
                  <HeaderContent>${numberFormat(row.sum)}</HeaderContent>
                </Header>
              </GridColumn>
            </GridRow>
          );
        })}

        {/* <GridRow>
          <GridColumn>A</GridColumn>
          <GridColumn>B</GridColumn>
          <GridColumn>C</GridColumn>
        </GridRow> */}
      </Grid>

      {/* <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            {columns.map((col, index) => {
              return (
                <Table.HeaderCell key={index}>{col.title}</Table.HeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((row, rowIndex) => {
            return (
              <Table.Row key={rowIndex}>
                {columns.map((col, index) => {
                  return (
                    <Table.Cell key={index}>{row[col.dataKey]}</Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table> */}
    </div>
  );
}
