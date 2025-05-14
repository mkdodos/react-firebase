import React from "react";
import { Table, Button, Icon,Checkbox } from "semantic-ui-react";
import numberFormat from "../../../utils/numberFormat";

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

  const handleFilter = (e, column) => {
    dispatch({
      type: "FILTER",
      payload: { column, [column]: e.target.innerHTML },
    });
    // console.log(e.target.innerHTML);
    // console.log(column);
  };

  const genColumn = (key, value) => {
    switch (key) {
      case "date":
        return value.slice(5, 10);
      case "amt":
        return numberFormat(value);
      case "isClosed":
        return (
          <Checkbox
            toggle
            // onChange={(e, data) => setChecked(data.checked)}
            checked={value}
          />
        );
      default:
        return value;
    }
  };

  return (
    <Table celled sortable striped unstackable>
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
                {/* 小計顯示金額,其它欄位顯示文字 */}
                {col.dataKey == "amt" ? numberFormat(state.total) : col.title}
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
                return (
                  <Table.Cell
                    key={index}
                    // onClick={(e) => handleFilter(e, col.dataKey)}
                  >
                    {genColumn(col.dataKey, row[col.dataKey])}
                    {/* 小計欄位數字格式化 */}
                    {/* {col.dataKey == "amt"
                      ? numberFormat(row[col.dataKey])
                      : row[col.dataKey]}

                    {col.dataKey == "date" && row.date.slice(0, 5)} */}
                  </Table.Cell>
                );
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
