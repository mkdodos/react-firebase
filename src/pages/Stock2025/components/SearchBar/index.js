import YearDropdown from "./components/YearDropdown";
import MonthDropdown from "./components/MonthDropdown";
import {
  Grid,
  GridColumn,
  GridRow,
  Button,
  Form,
  FormField,
  FormGroup,
  Icon
} from "semantic-ui-react";

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

  const handleQuery = () => {
    dispatch({
      type: "LOAD",
    });
  };

  return (
    <Grid columns={3}>
      <GridRow>
        <GridColumn>
          <YearDropdown onChange={handleYearChange} value={state.search.year} />
        </GridColumn>
        <GridColumn>
          <MonthDropdown
            onChange={handleMonthChange}
            value={state.search.month}
          />
        </GridColumn>
        <GridColumn>
          <Button onClick={handleQuery} primary fluid>
             <Icon name='search' />
            查詢</Button>
        </GridColumn>
      </GridRow>
    </Grid>
    // <Form>
    //   <FormGroup>
    //     <FormField>
    //       <YearDropdown onChange={handleYearChange} value={state.search.year} />
    //     </FormField>
    //     <FormField >
    //       <MonthDropdown
    //         onChange={handleMonthChange}
    //         value={state.search.month}
    //       />
    //     </FormField>
    //     <FormField>
    //       <Button onClick={handleQuery}>查詢</Button>
    //     </FormField>
    //   </FormGroup>
    // </Form>
  );
}
