import React from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';

export default function EditForm({
  open,
  setOpen,
  row,
  handleChange,
  handleSave,
  handleDelete,
}) {
  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        closeIcon
      >
        <Modal.Header>編輯</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>姓名</label>
              <input
                type="text"
                name="name"
                value={row.name}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Group>
            <Form.Field>
              <label>參加人數</label>
              <input
                type="number"
                name="people_qty"
                value={row.people_qty}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>金額</label>
              <input
                type="number"
                name="amount"
                value={row.amount}
                onChange={handleChange}
              />
            </Form.Field>
            </Form.Group>

            <Form.Field>
              <label>備註</label>
              <input
                type="text"
                name="note"
                value={row.note}
                onChange={handleChange}
              />
            </Form.Field>
            
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={handleSave}>
            儲存
          </Button>
          <Button floated="left" color="red" onClick={handleDelete}>
            刪除
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}