import React, { useState } from 'react';
import { Form, Button, Modal } from 'semantic-ui-react';
import StockDropdown from './StockDropdown';

export default function EditForm({ columns, state, dispatch, row, setRow }) {
  // 篩選可編輯欄位
  columns = columns.filter((col) => col.editable);
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

  const handleInputChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  const handleStockChange = (e, obj) => {
    // 下拉選項由股票代碼+空白+股票名稱組成
    // 用空白分隔函數取得股票名稱
    const str = e.target.innerText;
    const words = str.split(' ');
    // 分別寫入股票代碼和股票名稱二個值
    setRow({ ...row, stockNo: obj.value, stockName: words[1] });
  };

  // 組合 group 中的 field
  const formFields = (index, columnsPerRow) => {
    let fields = [];
    columns.slice(index, index + columnsPerRow).map((col, index) => {
      if (col.name == 'stockName') {
        // 股票名稱下拉選單
        fields.push(
          <StockDropdown
            key={index}
            value={row.stockNo}
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

  const handleDelete = (row) => {
    if (confirm('確定刪除嗎?')) dispatch({ type: 'DELETE', payload: { row } });
  };

  return (
    <>
      <Modal
        onClose={() => dispatch({ type: 'CLOSE' })}
        open={state.open}
        closeIcon
      >
        <Modal.Header>編輯</Modal.Header>
        <Modal.Content>
          <Form>{formGroups(3)}</Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            onClick={() =>
              dispatch({
                type: state.rowIndex == -1 ? 'CREATE' : 'UPDATE',
                payload: { row },
              })
            }
          >
            儲存
          </Button>
          <Button floated="left" color="red" onClick={() => handleDelete(row)}>
            刪除{row.rowCounts}
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
