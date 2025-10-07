import { TabPane, Tab } from "semantic-ui-react";
import Scordboard from "./Scoreboard";
import CardPrint from "./CardPrint";

const panes = [
  {
    menuItem: "計分版",
    render: () => (
      <TabPane>
        <Scordboard />
      </TabPane>
    ),
  },
  {
    menuItem: "卡片列印",
    render: () => (
      <TabPane>
        <CardPrint />
      </TabPane>
    ),
  }
];

export default function index() {
  return (
    <>
      <Tab panes={panes} />
    </>
  );
}
