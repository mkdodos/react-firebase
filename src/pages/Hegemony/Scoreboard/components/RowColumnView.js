import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import "./style.css"

export default function RowColumnView({ state }) {
  const { scores, roles } = state;
  // console.log(scores[0]);
  
  return (
    <>
      {/* 欄列對應的表格 */}
      <Table celled unstackable className="scoreboard">
        <TableHeader>
          <TableRow>
            <TableHeaderCell>姓名/角色</TableHeaderCell>
           
            {roles.map((role) => {
              return (
                <TableHeaderCell key={uuidv4()} className={role.id}>
                  {role.name}
                </TableHeaderCell>
              );
            })}
            <TableHeaderCell>個人總分</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scores.map((obj) => {
            return (
              <TableRow key={uuidv4()}>
                <TableCell>{obj.playerName}</TableCell>
                {/* 角色標題和內容都需用迴圈,相同順序才能正確顯示對應分數 */}
                {roles.map((role) => {
                  return <TableCell key={uuidv4()}>{obj[role.id]}</TableCell>;
                })}
                <TableCell>{obj.total}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
