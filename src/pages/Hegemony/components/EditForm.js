import {
  Form,
  Button,
  Modal,
  TextArea,
  Label,
  FormField,
} from "semantic-ui-react";
import StockDropdown from "../../../components/StockDropdown";
import { useState } from "react";

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

  // Label Select
  // 階級選擇
  const labelSelect = () => {
    // 點選 Label 設定 row.class
    // 非點選該項目時,樣式設定為 basic
    return (
      <>
        <Label
          onClick={() => selectLable("勞工")}
          size="large"
          color="red"
          basic={row.class !== "勞工"}
        >
          勞工
        </Label>
        <Label
          onClick={() => selectLable("中產")}
          size="large"
          color="orange"
          basic={row.class !== "中產"}
        >
          中產
        </Label>
        <Label
          onClick={() => selectLable("資本家")}
          size="large"
          color="blue"
          basic={row.class !== "資本家"}
        >
          資本家
        </Label>
        <Label
          onClick={() => selectLable("政府")}
          size="large"
          color="grey"
          basic={row.class !== "政府"}
        >
          政府
        </Label>
      </>
    );
  };

  // const [classLabel, setClassLabel] = useState("");

  const selectLable = (text) => {
    setRow({ ...row, class: text });
    // console.log(row);
    // setClassLabel(text);
  };

  // 組合 group 中的 field
  const formFields = (index, columnsPerRow) => {
    let fields = [];
    columns.slice(index, index + columnsPerRow).map((col, index) => {
      switch (col.dataKey) {
        case "content":
          fields.push(
            <Form.Field key={index}>
              <label>內容</label>
              <TextArea
                placeholder="Tell us more"
                name={col.dataKey}
                value={row.content}
                onChange={handleInputChange}
                // rows={5}
                style={{ minHeight: 200 }}
              />
            </Form.Field>
          );
          return;

        case "class":
          fields.push(
            <Form.Field key={index}>
              <label>階級</label>
              {labelSelect()}
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
        <Modal.Header> 編輯</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field></Form.Field>
            {formGroups(2)}
          </Form>
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
