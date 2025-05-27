import { useState } from "react";
import { Form, Button, Modal, Checkbox,Menu } from "semantic-ui-react";
import StockDropdown from "./StockDropdown";

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

  const [isSold, setIsSold] = useState(true);

  // 篩選買進或賣出欄位
  if (isSold) {
    columns = columns.filter((col) => col.dataKey != "inQty");
  } else {
    columns = columns.filter((col) => col.dataKey != "outQty");
  }

  const handleInputChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  const handleStockChange = (e, obj) => {
    // 下拉選項由股票代碼+空白+股票名稱組成
    // 用空白分隔函數取得股票名稱
    const str = e.target.innerText;
    const words = str.split(" ");
    // 分別寫入股票代碼和股票名稱二個值
    setRow({ ...row, stockNo: obj.value, stockName: words[1] });
  };

  // 是否封存
  const handleIsClosedChange = (e, data) => {
    setRow({ ...row, isClosed: data.checked });
  };

  // 組合 group 中的 field
  const formFields = (index, columnsPerRow) => {
    let fields = [];
    columns.slice(index, index + columnsPerRow).map((col, index) => {
      switch (col.dataKey) {
        case "stockName":
          fields.push(
            <Form.Field key={index}>
              <label>{col.title}</label>
              <StockDropdown
                key={index}
                value={row.stockNo}
                onChange={handleStockChange}
                options={state?.options}
              />
            </Form.Field>
          );
          break;

        case "isClosed":
          fields.push(
            <Form.Field key={index}>
              <label>{col.title}</label>
              <Checkbox
                toggle
                onChange={handleIsClosedChange}
                checked={row.isClosed ? row.isClosed : false}
              />
            </Form.Field>
          );
          break;

        default:
          fields.push(
            <Form.Field key={index}>
              <label>{col.title}</label>
              <Form.Input
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
          <Menu secondary pointing widths={2}>
            <Menu.Item
              onClick={() => setIsSold(false)}
              active={!isSold}
              color="red"
            >
              買進
            </Menu.Item>
            <Menu.Item
              onClick={() => setIsSold(true)}
              active={isSold}
              color="teal"
            >
              賣出
            </Menu.Item>
          </Menu>
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
