import { useState } from "react";
import { Button, Label } from "semantic-ui-react";
import printPDF from "./Pdf";

export default function ClassSelector({ dispatch,state }) {
  const [className, setClassName] = useState("");
  // 按下時記錄按下的項目,每個項目再和此項目比對
  // 相同時改變樣式
  const selectLable = (text) => {
    setClassName(text);
    // 將值傳給 reducer, 做資料載入
    dispatch({ type: "LOAD", className: text });
  };

  const print = () => {
    
    console.log(state.data)

    // dispatch({ type: "PRINT" });
  };
  return (
    <>
      <Label
        onClick={() => selectLable("勞工")}
        size="large"
        color="red"
        basic={className !== "勞工"}
      >
        勞工
      </Label>
      <Label
        onClick={() => selectLable("中產")}
        size="large"
        color="orange"
        basic={className !== "中產"}
      >
        中產
      </Label>
      <Label
        onClick={() => selectLable("資本家")}
        size="large"
        color="blue"
        basic={className !== "資本家"}
      >
        資本家
      </Label>
      <Label
        onClick={() => selectLable("政府")}
        size="large"
        color="grey"
        basic={className !== "政府"}
      >
        政府
      </Label>
      <Button floated="right" onClick={()=>printPDF(state.data)}>列印</Button>
    </>
  );
}
