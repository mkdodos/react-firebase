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
  const card = (obj, index) => {
    return (
      <Card fluid color={getColorCard(obj.class)}>
        <CardContent>
          <CardHeader style={{ color: getColor(obj.class) }} textAlign="center">
            {obj.title}
          </CardHeader>
        </CardContent>
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
        </CardContent>
        <CardContent>
          <Button floated="right" onClick={() => handleEdit(obj, index)}>
            編輯
          </Button>
        </CardContent>
      </Card>
    );
  };

  // 組合每一列 group
  // (資料,每幾筆做一群組)
  const genGroup = (rowsPerGroup) => {
    const groups = [];
    for (let i = 0; i < data.length; i++) {
      if (i % rowsPerGroup == 0) {
        groups.push(
          // <GridRow key={i}>{i}</GridRow>
          <GridRow key={i}>{genGroupDetail(i, rowsPerGroup)}</GridRow>
        );
      }
    }
    return groups;
  };

  const genGroupDetail = (index, rowsPerGroup) => {
    let fields = [];
    data.slice(index, index + rowsPerGroup).map((obj, index) => {
      fields.push(
        <GridColumn key={index}>         
          <span>{card(obj, index)}</span>
        </GridColumn>
      );
    });
    return fields
  };

  return (
    <Grid columns={3} stackable>
      {/* 每幾筆產生一新列 */}
      {genGroup(3)}
      {/* <GridRow>
        {data.map((obj, index) => {
          return (
            <GridColumn key={index}>
              <span>{card(obj, index)}</span>
            </GridColumn>
          );
        })}      
      </GridRow> */}
    </Grid>
  );
}
