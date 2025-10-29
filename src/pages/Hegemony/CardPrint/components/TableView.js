import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  Button
} from "semantic-ui-react";

export default function TableView({ rows, columns,handleEdit }) {
  return (
    <Table celled unstackable>
      <TableHeader>
        <TableRow>
          {/* 欄位迴圈 */}
          {columns.map((col, index) => {
            return <TableHeaderCell width={col.width} key={index}>{col.title}</TableHeaderCell>;
          })}
          <TableHeaderCell width={2}>#</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {/* 資料迴圈 */}
        {rows.map((obj,rowIndex) => (
          <TableRow key={obj.id}>
            {/* 欄位迴圈 */}
            {columns.map((col, index) => {
              return <TableCell key={index}>{obj[col.dataKey]}</TableCell>;
            })}
            <TableCell><Button onClick={()=>handleEdit(obj,rowIndex)}>編輯</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

