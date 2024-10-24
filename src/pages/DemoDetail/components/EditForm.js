import React from 'react';
import { Form, Menu } from 'semantic-ui-react';
import StockDropdown from './StockDropdown';

export default function EditForm({
  columns,
  row,
  handleInputChange,
  handleStockChange,
  isSold,
  setIsSold,
}) {
  // 點選買進或賣出後,只顯示買進或賣出欄位
  if (isSold) columns = columns.filter((col) => col.name != 'inQty');
  else columns = columns.filter((col) => col.name != 'outQty');

  // 組合每一列 group
  const formGroups = (columnsPerRow) => {
    const groups = [];
    for (let i = 0; i < columns.length; i++) {
      if (i % columnsPerRow == 0)
        groups.push(
          <Form.Group widths={columnsPerRow} key={i}>
            {formFields(i, columnsPerRow)}
          </Form.Group>
        );
    }
    return groups;
  };

  // 組合 group 中的 field
  const formFields = (index, columnsPerRow) => {
    let fields = [];
    columns.slice(index, index + columnsPerRow).map((col, index) => {
      if (!col.editable) return;

      if (col.name == 'stockName') {
        // 股票名稱下拉選單
        fields.push(
          <StockDropdown
            key={index}
            value={row.stockName}
            onChange={handleStockChange}
          />
        );
      } else {
        // 文字輸入框
        fields.push(
          <Form.Field key={index}>
            <label>{col.label}</label>
            <Form.Input
              type={col.type}
              name={col.name}
              value={row[col.name]}
              onChange={handleInputChange}
            />
          </Form.Field>
        );
      }
    });
    return fields;
  };

  return (
    <>
      <Menu secondary pointing widths={2}>
        <Menu.Item
          active={!isSold}
          color="teal"
          onClick={() => setIsSold(false)}
        >
          買進
        </Menu.Item>
        <Menu.Item
          active={isSold}
          color="orange"
          onClick={() => setIsSold(true)}
        >
          賣出
        </Menu.Item>
      </Menu>

      <Form>{formGroups(4)}</Form>
    </>
  );
}
