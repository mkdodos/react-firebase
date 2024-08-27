import React from 'react';
import { Form } from 'semantic-ui-react';

export default function SearchBar({
  loading,
  search,
  setSearch,
  handleQuery,
  handleQueryAll,
  rowsCount
}) {
  const handleChange = (e) => {
    setSearch({ ...search, name: e.target.value });
  };
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Input value={search.name} onChange={handleChange} />
          <Form.Button loading={loading} color="teal" onClick={handleQuery}>
            查詢
          </Form.Button>
          <Form.Button loading={loading} color="pink" onClick={handleQueryAll}>
            查詢全部 {rowsCount}
          </Form.Button>
        </Form.Group>
      </Form>
    </div>
  );
}
