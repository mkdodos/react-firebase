// 年月群組金額
import {
  GridRow,
  GridColumn,
  Grid,
  Header,
  HeaderContent,
  HeaderSubheader,
  Label,
  AccordionTitle,
  AccordionContent,
  Accordion,
  Icon,
  Button,
} from "semantic-ui-react";
import numberFormat from "../../../utils/numberFormat";
import { useState } from "react";

export default function GroupedYM({
  data,
  activeIndex,
  setActiveIndex,
  index,
}) {
  console.log(activeIndex);
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

  const handleClick = (e, { index }) => {
    // console.log(a)

    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const handleButtonClick = (index) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const headerSize = 'h4'
  return (
    <>
      {/* <Button onClick={() => handleButtonClick(0)}>111</Button> */}
      <Accordion>
        <AccordionTitle>
          {/* 覆蓋預設圖示,呈現空白 */}
          <Icon name="" />
        </AccordionTitle>
        {/* <AccordionTitle
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          <Label size="large" basic color="blue">
            明細
          </Label>
        </AccordionTitle> */}
        <AccordionContent index={0} active={activeIndex === 0}>
          <Grid  columns={4} divided="vertically">
            {data.map((row, rowIndex) => {
              return (
                <GridRow key={rowIndex}>
                  {/* <GridColumn></GridColumn> */}

                  <GridColumn width={3} verticalAlign="top">
                    <Header as={headerSize}>
                      <HeaderContent>
                        <Label size="large" color="yellow"   circular>{row.ym.substring(5, 9)}</Label>
                      </HeaderContent>
                    </Header>
                  </GridColumn>
                  <GridColumn verticalAlign="middle">
                    <Header as={headerSize} color="red">
                      <HeaderContent>${numberFormat(row.sumInAmt)}</HeaderContent>
                    </Header>
                  </GridColumn>
                  <GridColumn verticalAlign="middle">
                    <Header as={headerSize} color="teal">
                      <HeaderContent>${numberFormat(row.sumOutAmt)}</HeaderContent>
                    </Header>
                  </GridColumn>
                  <GridColumn verticalAlign="middle">
                    <Header as={headerSize}>
                      <HeaderContent>{numberFormat(row.sum)}</HeaderContent>
                    </Header>
                  </GridColumn>
                </GridRow>
              );
            })}
          </Grid>
        </AccordionContent>
      </Accordion>

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
    </>
  );
}
