import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";

export default function TableView({
  state,
  dispatch,
  columns,
  handleAdd,
  handleEdit,
  isEditable,
}) {
  // sortedColumn 目前排序欄位
  // direction 遞增遞減
  const { sortedColumn, direction, data, loading } = state;

  return (
    <Table celled sortable striped>
      <Table.Header>
        <Table.Row>
          {/* 欄位迴圈 */}
          {columns.map((col, index) => {
            return (
              <Table.HeaderCell
                width={col.width}
                key={index}
                sorted={sortedColumn == col.dataKey ? direction : null}
                onClick={() =>
                  dispatch({
                    type: "SORT",
                    payload: { sortedColumn: col.dataKey, type: col.type },
                  })
                }
              >
                {col.title}
              </Table.HeaderCell>
            );
          })}
          {/* 新增欄 */}
          {isEditable && (
            <Table.HeaderCell>
              <Button primary loading={loading} onClick={handleAdd}>
                <Icon name="plus" />
                新增
              </Button>
            </Table.HeaderCell>
          )}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {/* 資料迴圈 */}
        {data.map((row, rowIndex) => {
          return (
            <Table.Row key={row.id}>
              {/* 欄位迴圈 */}
              {columns.map((col, index) => {
                return <Table.Cell key={index}>{row[col.dataKey]}</Table.Cell>;
              })}
              {/* 編輯欄 */}
              {isEditable && (
                <Table.Cell>
                  <Button onClick={() => handleEdit(row, rowIndex)}>
                    編輯
                  </Button>
                </Table.Cell>
              )}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
