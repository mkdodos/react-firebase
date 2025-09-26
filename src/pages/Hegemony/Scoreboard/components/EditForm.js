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

  const handlePlayerChange = (e, { value }) => {
    // setRow({ ...row, player: value });
    setRow({ ...row, player: value,playerText:e.target.innerText });
  };

  const handleRoleChange = (e, { value }) => {
    // console.log(e.target.innerText);
    // 同時存放 role (英文)  roleText (中文)
    setRow({ ...row, role: value, roleText: e.target.innerText });
  };

  const players = [
    {
      key: "1",
      text: "馬克",
      value: "A",
    },
    {
      key: "2",
      text: "宜君",
      value: "B",
    },
    {
      key: "3",
      text: "愷軒",
      value: "C",
    },
    {
      key: "4",
      text: "欣妤",
      value: "D",
    },
  ];

  const roles = [
    {
      key: "1",
      text: "勞工",
      value: "labor",
    },
    {
      key: "2",
      text: "中產",
      value: "middle",
    },
    {
      key: "3",
      text: "資本",
      value: "cap",
    },
    {
      key: "4",
      text: "政府",
      value: "gov",
    },
  ];

  // 組合 group 中的 field
  const formFields = (index, columnsPerRow) => {
    let fields = [];
    columns.slice(index, index + columnsPerRow).map((col, index) => {
      // 依不同欄位顯示不同輸入控制項
      switch (col.dataKey) {
        case "player":
          fields.push(
            <Form.Field key={index}>
              <label>{col.title}</label>
              <Dropdown
                selection
                search
                onChange={handlePlayerChange}
                placeholder="選擇資料"
                options={players}
                value={row.player}
              />
            </Form.Field>
          );
          return;

        case "role":
          fields.push(
            <Form.Field key={index}>
              <label>{col.title}</label>
              <Dropdown
                selection
                search
                onChange={handleRoleChange}
                placeholder="選擇資料"
                options={roles}
                value={row.role}
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
