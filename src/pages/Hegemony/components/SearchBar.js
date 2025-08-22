import { useState } from "react";
import { Button, Input } from "semantic-ui-react";
import ClassSelector from "./ClassSelector";

export default function SearchBar({ dispatch }) {
  //  const date = new Date().toISOString().substring(0,10);
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [className, setClassName] = useState("");
  const query = () => {
    console.log(date);
    console.log(className);
    dispatch({ type: "LOAD", payload: { className,date } });
  };
  const queryClear = () => {
    setClassName("");
    // console.log(date);
    // console.log(className);
  };
  return (
    <>
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <ClassSelector
        className={className}
        setClassName={setClassName}
        dispatch={dispatch}
      />
      <Button onClick={query}>查詢</Button>
      <Button onClick={queryClear}>清除查詢</Button>
    </>
  );
}
