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
  console.log(data);
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
        <CardContent style={{backgroundColor:getColor(obj.class)}}>
          <CardHeader style={{color:'white'}}  textAlign="center">{obj.title}</CardHeader>
          {/* <CardMeta>
            <span>{obj.class}</span>
          </CardMeta> */}
          {/* <CardDescription>
            Matthew is a musician living in Nashville.
          </CardDescription> */}
        </CardContent>
        <CardContent>
          {/* {obj.content} */}
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
          {/* <Label>{obj.class}</Label> */}
        </CardContent>
      </Card>
    );
  };

  return (
    <Grid columns={3} celled>
      {/* 每幾筆產生一新列 */}
      {}
      <GridRow>
        {data.map((obj, index) => {
          return (
            <GridColumn>
              <span>{card(obj, index)}</span>
            </GridColumn>
          );
        })}

        {/* <GridColumn>
          <span>{card()}</span>
        </GridColumn> */}
        {/* <GridColumn>
          <span>{card()}</span>
        </GridColumn>
        <GridColumn>
          <span>{card()}</span>
        </GridColumn> */}
      </GridRow>
    </Grid>
  );
}
