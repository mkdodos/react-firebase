// 交易記錄
import {
  Table,
  Button,
  Checkbox,
  Header,
  HeaderContent,
  HeaderSubheader,
  GridRow,
  GridColumn,
  Grid,
} from "semantic-ui-react";
import numberFormat from "../../../utils/numberFormat";
import GroupedYM from "./GroupedYM";

export default function TableView({ state, columns, handleAdd, handleEdit }) {
  const { data, loading } = state;

  console.log(state);

  // 針對不同欄位做不同顯示
  const genColumn = (key, value) => {
    switch (key) {
      case "date":
        return value.slice(5, 10);
      case "amt":
        return numberFormat(value);
      case "isClosed":
        return <Checkbox toggle checked={value != "" && value} />;
      default:
        return value;
    }
  };

  return (
    <>
      <GroupedYM data={state.dataGroupedYM} />
      <Grid columns={3} divided>
        {/* <GridRow>
          <GridColumn></GridColumn>
        </GridRow> */}
        <GridRow>
          <GridColumn>
            <Header as="h2" color="red">
              <HeaderContent>
                ${numberFormat(state.total.sumInAmt)}
                <HeaderSubheader>買入金額</HeaderSubheader>
              </HeaderContent>
            </Header>
          </GridColumn>
          <GridColumn>
            <Header as="h2" color="teal">
              <HeaderContent>
                ${numberFormat(state.total.sumOutAmt)}
                <HeaderSubheader>賣出金額</HeaderSubheader>
              </HeaderContent>
            </Header>
          </GridColumn>
          <GridColumn>
            <Header as="h2" color="blue">
              <HeaderContent>
                ${numberFormat(state.total.sumAmt)}
                {/* <HeaderSubheader>淨收支</HeaderSubheader> */}
              </HeaderContent>
            </Header>
          </GridColumn>
        </GridRow>
      </Grid>

      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            {columns.map((col, index) => {
              return (
                <Table.HeaderCell key={index}>{col.title}</Table.HeaderCell>
              );
            })}
            <Table.HeaderCell>
              <Button primary onClick={handleAdd} loading={loading}>
                新增
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((row, index) => {
            return (
              <Table.Row key={row.id}>
                {columns.map((col, index) => {
                  return (
                    <Table.Cell key={index}>
                      {genColumn(col.dataKey, row[col.dataKey])}
                    </Table.Cell>
                  );
                })}
                <Table.Cell>
                  <Button onClick={() => handleEdit(row, index)}>編輯</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
