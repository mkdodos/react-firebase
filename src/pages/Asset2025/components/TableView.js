import { Table, Button } from "semantic-ui-react";
import numberFormat from "../../../utils/numberFormat";

export default function TableView({ state, columns, handleAdd, handleEdit }) {
  const { data, loading } = state;

  return (
    <>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            {columns.map((col, index) => {
              return (
                <Table.HeaderCell key={index}>{col.title}</Table.HeaderCell>
              );
            })}
            <Table.HeaderCell>
              <Button primary onClick={handleAdd} loading={loading}>
                新增
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((row, index) => {
            return (
              <Table.Row key={row.id}>
                {columns.map((col, index) => {
                  return (
                    <Table.Cell key={index}>
                      {/* 數字格式化 */}
                      {col.type == "number"
                        ? numberFormat(row[col.dataKey])
                        : row[col.dataKey]}
                    </Table.Cell>
                  );
                })}
                <Table.Cell>
                  <Button onClick={() => handleEdit(row, index)}>編輯</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
