import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "semantic-ui-react";



export default function TableView({ rows, columns }) {
  return (
    <Table celled unstackable>
      <TableHeader>
        <TableRow>
          {/* 欄位迴圈 */}
          {columns.map((col, index) => {
            return <TableHeaderCell width={col.width} key={index}>{col.title}</TableHeaderCell>;
          })}
        </TableRow>
      </TableHeader>

      <TableBody>
        {/* 資料迴圈 */}
        {rows.map((obj) => (
          <TableRow key={obj.id}>
            {/* 欄位迴圈 */}
            {columns.map((col, index) => {
              return <TableCell key={index}>{obj[col.dataKey]}</TableCell>;
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

