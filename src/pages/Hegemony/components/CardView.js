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
} from "semantic-ui-react";
import index from "..";

export default function CardView({ data, handleEdit }) {
  console.log(data);
  const card = (obj,index) => {
    return (
      <Card fluid>
        <CardContent>
          <CardHeader textAlign="center">{obj.title}</CardHeader>
          {/* <CardMeta>
            <span className="date">Joined in 2015</span>
          </CardMeta> */}
          {/* <CardDescription>
            Matthew is a musician living in Nashville.
          </CardDescription> */}
        </CardContent>
        <CardContent>
            {obj.content}
          {/* <div
            style={{
              fontSize: "1.03em",
              lineHeight: "1.6em",
              whiteSpace: "pre-wrap",
            }}
            dangerouslySetInnerHTML={{
              __html: obj.content,
            }}
          ></div> */}
        </CardContent>
        <CardContent>
          <Button onClick={() => handleEdit(obj, index)}>編輯</Button>
        </CardContent>
      </Card>
    );
  };
  return (
    <Grid columns={3}>
      <GridRow>
        {data.map((obj,index) => {
          return (
            <GridColumn>
              <span>{card(obj,index)}</span>
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
