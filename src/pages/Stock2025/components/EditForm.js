import React, { useState } from "react";
import { Form, Button, Modal, Menu, Checkbox } from "semantic-ui-react";
import StockDropdown from "./StockDropdown";

export default function EditForm({ columns, state, dispatch, row, setRow }) {
  // 篩選可編輯欄位
  columns = columns.filter((col) => col.editable);

  const { isEditFormOpen, editedRowIndex } = state;

  const [isSold, setIsSold] = useState(true);

  // 篩選買進或賣出欄位
  if (isSold) {
    columns = columns.filter((col) => col.dataKey != "inQty");
  } else {
    columns = columns.filter((col) => col.dataKey != "outQty");
  }

  // 組合每一列 group
  // columnsPerRow :　每列幾個欄位
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

  // 組合 group 中的 field
  const formFields = (index, columnsPerRow) => {
    let fields = [];
    columns.slice(index, index + columnsPerRow).map((col, index) => {
      switch (col.dataKey) {
        case "stockName":
          fields.push(
            <StockDropdown
              key={index}
              value={row.stockNo}
              onChange={handleStockChange}
            />
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

  // 文字輸入後改變 row 的值
  const handleInputChange = (e) => {
    // console.log(row)
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

  // 文字輸入後改變 row 的值
  const handleIsClosedChange = (e, data) => {
    console.log(data.checked);
    setRow({ ...row, isClosed: data.checked });
  };

  // 儲存
  const handleSave = () => {
    // 將 row 的值傳給 reducer
    if (editedRowIndex == -1) {
      dispatch({ type: "CREATE", payload: { row } });
    } else {
      dispatch({ type: "UPDATE", payload: { row } });
    }
  };

  return (
    <div>
      <Modal open={isEditFormOpen}>
        <Modal.Header>
          編輯
          <Button
            floated="right"
            onClick={() => dispatch({ type: "CLOSE_EDITFORM" })}
          >
            X
          </Button>
        </Modal.Header>
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

          <Form>{formGroups(5)}</Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={handleSave}>
            儲存
          </Button>
          {/* 編輯時才顯示刪除鈕 */}
          {editedRowIndex > -1 && (
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
          )}
        </Modal.Actions>
      </Modal>
    </div>
  );
}
