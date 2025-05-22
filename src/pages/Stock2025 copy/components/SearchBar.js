import React from "react";
import { Button, Form, Input } from "semantic-ui-react";
import StockDropdown from "./StockDropdown";

export default function SearchBar({ state, dispatch }) {
//   console.log(state.search);
  const handleDateChange = (e) => {
    dispatch({ type: "SET_SEARCH", payload: { date: e.target.value } });
    // console.log(e.target.value);
  };
  const handleStockChange = (e, { value }) => {
    dispatch({ type: "SET_SEARCH", payload: { stockNo: value } });
  };
  const handleSearch = () => {
    dispatch({ type: "SEARCH" });
  };
  const handleClearSearch = () => {
    dispatch({ type: "CLEAR_SEARCH" });
  };
  return (
    <Form>
      <Form.Group>
        <Form.Field width={4}>
          {/* <StockDropdown
            value={state.search.stock}
            onChange={handleStockChange}
          /> */}
        </Form.Field>
        <Form.Field>
          <label>日期</label>
          <Input
            type="date"
            onChange={handleDateChange}
            value={state.search?.date}
          />
        </Form.Field>
        <Form.Field>
          <label>&nbsp;</label>
          <Button onClick={handleSearch} loading={state.loading}>查詢</Button>
        </Form.Field>
        <Form.Field>
          <label>&nbsp;</label>
          <Button onClick={handleClearSearch}>清除查詢</Button>
        </Form.Field>
      </Form.Group>
    </Form>
  );
}
