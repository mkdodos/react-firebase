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
} from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";

export default function CardView({ data }) {
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
          <CardHeader>
            <Icon name="github" /> {cate}
          </CardHeader>
        </CardContent>
        <CardContent>{itemList(groupedData[cate])}</CardContent>
      </Card>
    );
  };

  // 類別包含的項目用清單呈現
  const itemList = (cateItems) => {
    return (
      <List divided relaxed size="large">
        {cateItems.map((obj) => {
          return (
            <ListItem key={uuidv4()}>
              <ListIcon name="square outline" verticalAlign="middle" />
              <ListContent>{obj.item}</ListContent>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return <Grid divided="vertically">{genRows(3)}</Grid>;
}
