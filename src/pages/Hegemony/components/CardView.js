import {
  Grid,
  GridRow,
  GridColumn,
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Button,
  Label,
} from "semantic-ui-react";
import index from "..";

export default function CardView({ data, handleEdit }) {
  // console.log(data);
  const getColor = (className) => {
    switch (className) {
      case "中產":
        return "#FF9B2F";
      case "勞工":
        return "#FB4141";
      case "資本家":
        return "#2185d0";
      case "政府":
        return "grey";
    }
  };

  const getColorCard = (className) => {
    switch (className) {
      case "中產":
        return "orange";
      case "勞工":
        return "red";
      case "資本家":
        return "blue";
      case "政府":
        return "grey";
    }
  };
  // 單張卡片
  const card = (obj, index) => {
    return (
      <Card fluid color={getColorCard(obj.class)}>
        <CardContent>
          <CardHeader style={{ color: getColor(obj.class) }} textAlign="center">
            {obj.title}
          </CardHeader>
        </CardContent>

        {obj.requirement && (
          // <Label attached="top right">{obj.requirement}</Label>
          <Label attached="bottom left">{obj.requirement}</Label>
        )}

        <CardContent>
          <div
            style={{
              fontSize: "1.03em",
              lineHeight: "1.6em",
              whiteSpace: "pre-wrap",
            }}
            dangerouslySetInnerHTML={{
              __html: obj.content,
            }}
          ></div>
          {/* {index} */}
        </CardContent>

        {obj.legitimacy && (
          <CardContent>
            <Label circular color={getColorCard(obj.class)}>+1</Label> / {obj.legitimacy}
          </CardContent>
        )}
        {/* <CardContent>{obj.legitimacy}</CardContent> */}

        <CardContent>
          <Button floated="right" onClick={() => handleEdit(obj, index)}>
            編輯
          </Button>
        </CardContent>
      </Card>
    );
  };

  // 群組顯示資料
  // (每幾筆做一群組)
  const genGroup = (rowsPerGroup) => {
    const groups = [];
    // 資料迴圈
    for (let i = 0; i < data.length; i++) {
      // 每一列的開頭產生一群組
      if (i % rowsPerGroup == 0) {
       
        groups.push(
          <GridRow key={i}>{genGroupDetail(i, rowsPerGroup)}</GridRow>
        );
      }
    }
    return groups;
  };

  // 群組明細
  const genGroupDetail = (index, rowsPerGroup) => {
    
    let fields = [];
    // 取出指定範圍的資料
    data.slice(index, index + rowsPerGroup).map((obj,objIndex) => {
    //  console.log(index + objIndex)
    // 0 1 2 
    // console.log(objIndex)
      fields.push(
        <GridColumn key={objIndex}>
          <span>{card(obj, index + objIndex)}</span>
        </GridColumn>
      );
    });
    return fields;
  };

  return (
    <Grid columns={3} stackable>
      {genGroup(3)}
    </Grid>
  );
}
