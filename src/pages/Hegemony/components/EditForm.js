import { Form, Button, Modal, TextArea } from "semantic-ui-react";
import StockDropdown from "../../../components/StockDropdown";

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

  const handleStockChange = (e, obj) => {
    // const str = e.target.innerText;
    // 在選取選項時,若有用鍵盤上下鍵,e.target.innerText會取不到值
    // 改用 options 取值
    // 下拉選項由股票代碼+空白+股票名稱組成
    // 用空白分隔函數取得股票名稱
    console.log(obj.options);
    const selectedStock = obj.options.find((row) => row.value == obj.value);
    const words = selectedStock.text.split(" ");
    console.log(words[1]);
    // 分別寫入股票代碼和股票名稱二個值
    setRow({ ...row, stockNo: obj.value, stockName: words[1] });
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
      // if (col.dataKey == "stockName") {
      //   fields.push(
      //     <Form.Field key={index}>
      //       <label>{col.title}</label>
      //       <StockDropdown onChange={handleStockChange} value={row.stockNo} />
      //     </Form.Field>
      //   );
      // } else {
      //   fields.push(
      //     <Form.Field key={index}>
      //       <label>{col.title}</label>
      //       <input
      //         type={col.type}
      //         name={col.dataKey}
      //         value={row[col.dataKey]}
      //         onChange={handleInputChange}
      //       />
      //     </Form.Field>
      //   );
      // }
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
