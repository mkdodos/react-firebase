import { useState } from "react";
import { Form, Button, Modal, Dropdown } from "semantic-ui-react";

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

  // 項目下拉
  const ItemOptions = [
    {
      key: "60",
      text: "60萬",
      value: "A60",
    },
    {
      key: "500",
      text: "500萬",
      value: "B500",
    },
  ];

  // 記錄選取項目的值
  const [item, setItem] = useState("500");

  // 選取項目改變事件
  const handleItemChange = (e, { value }) => {
    setRow({ ...row, item: value });
    // setItem(value);
  };

  // 組合 group 中的 field
  const formFields = (index, columnsPerRow) => {
    let fields = [];
    columns.slice(index, index + columnsPerRow).map((col, index) => {
      // 項目使用下拉
      if (col.dataKey == "item") {
        fields.push(
          <Form.Field key={index}>
            <label>{col.title}</label>
            <Dropdown
             selection
              options={ItemOptions}
              value={row.item}
              onChange={handleItemChange}
            />
          </Form.Field>
        );
      } else {
        fields.push(
          <Form.Field key={index}>
            <label>{col.title}</label>
            <input
              type={col.type}
              name={col.dataKey}
              value={row[col.dataKey]}
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
      <Modal
        onClose={() => dispatch({ type: "CLOSE" })}
        open={state.open}
        closeIcon
      >
        <Modal.Header>編輯</Modal.Header>
        <Modal.Content>
          <Form>{formGroups(2)}</Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            onClick={() =>
              dispatch({
                type: state.rowIndex == -1 ? "CREATE" : "UPDATE",
                payload: { row },
              })
            }
          >
            儲存
          </Button>
          <Button
            floated="left"
            color="red"
            onClick={() => {
              if (!confirm("確定刪除嗎?")) return;
              dispatch({ type: "DELETE", payload: { id: row.id } });
            }}
          >
            刪除
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
