import React, { useState } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import SelectSold from './SelectSold';

export default function EditForm({
  open,
  setOpen,
  handleChange,
  handleStockNameChange,
  row,
  handleSave,
  handleDelete,
  statRows,
  rowIndex,
  isSold,
  setIsSold,
  handleSold
}) {
  // console.log(stockRows);

  

  const stockOptions = statRows.map((obj) => {
    return { key: obj.name, text: obj.name, value: obj.name };
  });

  const handleItemClick = () => {
    setIsSold(!isSold);
  };

  // console.log(stockOptions);

  // 下拉選項
  // const options = [{ text: 'A', value: 'A', key: 'A' }];

  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        closeIcon
      >
        <Modal.Header>交易記錄</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <SelectSold
                handleItemClick={handleItemClick}
                isSold={isSold}
                setIsSold={setIsSold}
              />
            </Form.Field>
            <Form.Field>
              <label>日期</label>
              <input
                type="date"
                name="date"
                value={row.date}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>股票名稱</label>
              <Form.Select
                selection
                placeholder="名稱"
                fluid
                options={stockOptions}
                value={row.name}
                onChange={handleStockNameChange}
              />
            </Form.Field>
            <Form.Field>
              {/* <button onClick={() => handleSold(row.qty)}>賣出</button> */}
              <label>股數</label>
              <input
                type="number"
                name="qty"
                value={row.qty}
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label>單價</label>
              <input
                type="number"
                name="cost"
                value={row.cost}
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button floated="left" primary onClick={handleSave}>
            儲存
          </Button>

          {rowIndex !== -1 && (
            <Button color="red" onClick={handleDelete}>
              刪除
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    </>
  );
}
