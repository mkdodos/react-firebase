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

  const handleCateChange = (e, { value }) => {
    setRow({ ...row, cate: value });
  };



  const cates = [
    {
      key: "1",
      text: "食物",
      value: "食物",
    },
    {
      key: "2",
      text: "桌椅",
      value: "桌椅",
    },
    {
      key: "3",
      text: "餐具",
      value: "餐具",
    },
    {
      key: "4",
      text: "帳篷",
      value: "帳篷",
    },
    {
      key: "5",
      text: "爐具",
      value: "爐具",
    },
  ];

  // 組合 group 中的 field
  const formFields = (index, columnsPerRow) => {
    let fields = [];
    columns.slice(index, index + columnsPerRow).map((col, index) => {
      // 依不同欄位顯示不同輸入控制項
      switch (col.dataKey) {
        case "cate":
          fields.push(
            <Form.Field key={index}>
              <label>種類</label>
              <Dropdown
                selection
                search
                onChange={handleCateChange}
                placeholder="選擇資料"
                options={cates}
                value={row.cate}
              />
            </Form.Field>
          );
          return;

        default:
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
