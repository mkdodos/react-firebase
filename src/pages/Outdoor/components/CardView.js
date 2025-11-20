import { tr } from "@faker-js/faker";
import { useState } from "react";
import {
  Grid,
  GridRow,
  GridColumn,
  ListItem,
  ListIcon,
  ListContent,
  List,
  CardHeader,
  CardContent,
  Card,
  Icon,
  Label,
  Button,
} from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";

export default function CardView({ data, dispatch }) {
  // 群組資料
  const groupedData = Object.groupBy(data, ({ cate }) => cate); //
  // 所有類別
  const cates = Object.keys(groupedData);

  // columnsPerRow : 每一列的欄位數
  const genRows = (columnsPerRow) => {
    const groups = [];
    // 類別迴圈
    for (let i = 0; i < cates.length; i++) {
      // 達到設定的欄位數就產生新列
      if (i % columnsPerRow == 0) {
        groups.push(
          <GridRow columns={columnsPerRow} key={uuidv4()}>
            {/* 每一列的欄位內容 */}
            {genColumns(i, columnsPerRow)}
          </GridRow>
        );
      }
    }
    return groups;
  };

  const genColumns = (index, columnsPerRow) => {
    // 取出指定範圍的資料
    return cates.slice(index, index + columnsPerRow).map((cate) => {
      return <GridColumn key={uuidv4()}>{card(cate)}</GridColumn>;
    });
  };

  // 每個類別一張卡片
  const card = (cate) => {
    return (
      <Card>
        <CardContent>
          <CardHeader textAlign="center">
            <Icon name="github" /> {cate}
          </CardHeader>
        </CardContent>
        <CardContent>{itemList(groupedData[cate])}</CardContent>
      </Card>
    );
  };

  const checkItem = (item) => {
    dispatch({ type: "CHECK_ITEM", item });
  };

  // 類別包含的項目用清單呈現
  const itemList = (cateItems) => {
    return (
      <List divided relaxed="very" size="large">
        {cateItems.map((obj, index) => {
          return (
            <ListItem key={uuidv4()} onClick={() => checkItem(obj)}>
              {obj.checked ? (
                <ListIcon name="check square" />
              ) : (
                <ListIcon name="square outline" />
              )}

              <ListContent>{obj.item}</ListContent>
            </ListItem>
          );
        })}
      </List>
    );
  };

  const [isChecked, setIsChecked] = useState(false);

  const checkAll = () => {
    setIsChecked(!isChecked);
    dispatch({ type: "CHECK_ALL", isChecked: !isChecked });
  };

  return (
    <>
      <Grid divided="vertically">
        <GridRow>
          <GridColumn>
            <Button
              size="large"
              onClick={checkAll}
              color="green"
              basic
              icon             
              labelPosition="left"
            >
              <Icon name={isChecked ? "check square" : "square outline"} />
              全選
            </Button>
          </GridColumn>
        </GridRow>
        {genRows(3)}
      </Grid>
    </>
  );
}
