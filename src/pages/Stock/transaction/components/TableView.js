import React from 'react';
import { Table, Button, Modal } from 'semantic-ui-react';

export default function TableView({
  rows,
  handleAdd,
  handleEdit,
  handleShowAll,
  open,
  setOpen,
}) {
  return (
    <>
      <Modal
        onClose={() => {
          setOpen(false);
          handleShowAll();
        }}
        onOpen={() => setOpen(true)}
        open={open}
        closeIcon
      >
        <Modal.Header>交易明細</Modal.Header>
        <Modal.Content>
          <Table celled unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={2}>日期</Table.HeaderCell>
                <Table.HeaderCell width={2}>股票名稱</Table.HeaderCell>
                <Table.HeaderCell width={2}>股數</Table.HeaderCell>
                <Table.HeaderCell width={2}>購入單價</Table.HeaderCell>
                <Table.HeaderCell width={2}>小計</Table.HeaderCell>
                <Table.HeaderCell width={2}>
                  <Button primary onClick={handleAdd}>
                    新增
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {rows.map((row, index) => {
                return (
                  <Table.Row key={row.id}>
                    <Table.Cell>{row.date}</Table.Cell>
                    <Table.Cell>{row.name}</Table.Cell>
                    <Table.Cell>{row.qty}股</Table.Cell>
                    <Table.Cell>{row.cost}</Table.Cell>
                    <Table.Cell>{Math.round(row.qty * row.cost)}</Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => handleEdit(row, index)}>
                        編輯
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleShowAll}>全部</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
