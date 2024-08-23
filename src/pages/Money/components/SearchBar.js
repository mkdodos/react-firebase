import React from 'react';
import { Form } from 'semantic-ui-react';

export default function SearchBar({ loading, search, setSearch, handleQuery }) {
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
        </Form.Group>
      </Form>
    </div>
  );
}
