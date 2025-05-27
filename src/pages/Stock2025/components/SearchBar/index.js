import YearDropdown from "./components/YearDropdown";
import MonthDropdown from "./components/MonthDropdown";
import { Form, FormField, FormGroup } from "semantic-ui-react";

export default function index({ dispatch, state }) {
  const handleYearChange = (e, { value }) => {
    // 取得下拉選項的值設定為查詢值
    dispatch({ type: "SET_SEARCH", payload: { ...state.search, year: value } });
  };
  const handleMonthChange = (e, { value }) => {
    dispatch({
      type: "SET_SEARCH",
      payload: { ...state.search, month: value },
    });
  };
  return (
    <Form>
      <FormGroup>
        <FormField>
          <YearDropdown onChange={handleYearChange} value={state.search.year} />
        </FormField>
        <FormField>
          <MonthDropdown
            onChange={handleMonthChange}
            value={state.search.month}
          />
        </FormField>
      </FormGroup>
    </Form>
  );
}
