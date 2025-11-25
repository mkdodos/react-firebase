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

export default function DateView({ data, dispatch }) {
  // 依日期群組
  const groupedData = Object.groupBy(data, ({ date }) => date);
  // 所有日期
  const gKeys = Object.keys(groupedData);

  // 記錄那些日期已核取
  //   const [checkedGroup, setCheckedGroup] = useState([
  //     "2025-11-18",
  //     "2025-11-19",
  //     "2025-11-25",
  //   ]);

  const checkedGroup = ["2025-11-18", "2025-11-19", "2025-11-25"];

  const checkGroup = (key) => {
    // console.log(key);
    // 判斷是否已存在
    // const isExist = checkedGroup.find((obj) => obj == key);
    // console.log(isExist);
    // if (!isExist) {
    // setCheckedGroup([...checkedGroup, key]);
    // } else {
    //   // 找出項目所在索引,移除該項目
    const index = checkedGroup.findIndex((obj) => obj == key);
    //   console.log(index)
    checkedGroup.splice(index, 1);
    console.log(checkedGroup);
    //   setCheckedGroup(checkedGroup.splice(index, 1));
    //   setCheckedGroup(checkedGroup.splice(0, 1));
    // }

    // console.log(checkedGroup);
  };

  // 每個日期群組1張卡片
  const card = (key, index) => {
    return (
      <Card>
        <CardContent>
          <CardHeader textAlign="center">
            <Icon name="check square" onClick={() => checkGroup(key, index)} />
            {/* <Icon name="github" /> */}
            {key}
          </CardHeader>
        </CardContent>
        <CardContent>{contents(groupedData[key])}</CardContent>
      </Card>
    );
  };
  const checkItem = (item) => {
    dispatch({ type: "CHECK_ITEM", item });
  };
  // 每張卡片的內容(同一日期的項目)
  const contents = (items) => {
    return (
      <List divided relaxed="very" size="large">
        {items.map((obj, index) => {
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

  // 用 Grid 顯示卡片 (同一列多張卡片)

  // columnsPerRow : 每一列的欄位數
  const genRows = (columnsPerRow) => {
    const groups = [];
    // 類別迴圈
    for (let i = 0; i < gKeys.length; i++) {
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
    return gKeys.slice(index, index + columnsPerRow).map((key) => {
      return <GridColumn key={uuidv4()}>{card(key)}</GridColumn>;
    });
  };

  return (
    <>
      {" "}
      {JSON.stringify(checkedGroup)}
      <Grid divided="vertically">{genRows(3)}</Grid>
    </>
  );

  //   return <>{dates.map((date) => card(date))}</>;
}
