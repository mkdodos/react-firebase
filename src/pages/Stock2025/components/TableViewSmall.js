import { useState } from "react";
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
  Label,
  Icon,
} from "semantic-ui-react";
import numberFormat from "../../../utils/numberFormat";
import GroupedYM from "./GroupedYM";

export default function TableViewSmall({
  state,
  columns,
  handleAdd,
  handleEdit,
}) {
  const { data, loading } = state;

  const [activeIndex, setActiveIndex] = useState(-1);

  const handleButtonClick = (index) => {
    // console.log(index)
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <>
      <Grid columns={3}>
        {/* <GridRow>
          <GridColumn></GridColumn>
        </GridRow> */}
        <GridRow>
          <GridColumn>
            <Header as="h3" color="red">
              <HeaderContent>
                ${numberFormat(state.total.sumInAmt)}
                <HeaderSubheader>買入金額</HeaderSubheader>
              </HeaderContent>
            </Header>
          </GridColumn>
          <GridColumn>
            <Header as="h3" color="teal">
              <HeaderContent>
                ${numberFormat(state.total.sumOutAmt)}
                <HeaderSubheader>賣出金額</HeaderSubheader>
              </HeaderContent>
            </Header>
          </GridColumn>
          <GridColumn>
            <Header as="h3" >
              <HeaderContent>
                {numberFormat(state.total.sumAmt)}
                <HeaderSubheader>
                  {/* <Button onClick={() => handleButtonClick(0)}> 淨收支</Button> */}
                  <Icon name="dropdown" />
                  <span onClick={() => handleButtonClick(0)}> 淨收支</span>
                </HeaderSubheader>
              </HeaderContent>
            </Header>
          </GridColumn>
        </GridRow>
      </Grid>
      <GroupedYM
        data={state.dataGroupedYM}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        index={0}
      />

      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>
              <Button
                primary
                floated="right"
                onClick={handleAdd}
                loading={loading}
              >
              <Icon name='add' />   新增
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row, index) => {
            return (
              <Table.Row key={row.id} onClick={() => handleEdit(row, index)}>
                <Table.Cell>
                  <Header as="h4">{row.date.slice(5, 10)}</Header>
                  <span style={{ fontSize: "1.05em" }}>
                    {row.stockNo} {row.stockName}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h4">
                    {row.inQty ? row.inQty : row.outQty} 股
                  </Header>

                  <span style={{ fontSize: "1.05em" }}>{row.price}</span>
                </Table.Cell>

                <Table.Cell textAlign="right">
                  <Label size="large" basic color={row.inQty ? "red" : "teal"}>
                    $ {row.amt}
                  </Label>
                </Table.Cell>

                {/* <Table.Cell>
                  <Button onClick={() => handleEdit(row, index)}>編輯</Button>
                </Table.Cell> */}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
