import React, { useState } from 'react';
import { Form, Button, Modal,Menu } from 'semantic-ui-react';

export default function EditForm({
  columns,
  state,
  dispatch,
  row,
  setRow,

  isExpense,
  setIsExpense,
}) {
  // 篩選可編輯欄位
  columns = columns.filter((col) => col.editable);


   // 點選買進或賣出後,只顯示買進或賣出欄位
   if (isExpense) columns = columns.filter((col) => col.name != 'income');
   else columns = columns.filter((col) => col.name != 'expense');


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

  const handleChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  // 組合 group 中的 field
  const formFields = (index, columnsPerRow) => {
    let fields = [];
    columns.slice(index, index + columnsPerRow).map((col, index) => {
      // if (!col.editable) return;
      // 這樣寫的話,會出現有位置空白
      // 改成在一開始就篩選出全部可編輯欄位
      fields.push(
        <Form.Field key={index}>
          <label>{col.label}</label>
          <input
            type={col.type}
            name={col.name}
            value={row[col.name]}
            onChange={handleChange}
          />
        </Form.Field>
      );
    });
    return fields;
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
          <Menu secondary pointing widths={2}>
            <Menu.Item
              active={!isExpense}
              color="teal"
              onClick={() => setIsExpense(false)}
            >
              收入
            </Menu.Item>
            <Menu.Item
              active={isExpense}
              color="orange"
              onClick={() => setIsExpense(true)}
            >
              支出
            </Menu.Item>
          </Menu>

          <Form>{formGroups(2)}</Form>
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
          <Button
            floated="left"
            color="red"
            onClick={() => dispatch({ type: 'DELETE', payload: { row } })}
          >
            刪除
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
