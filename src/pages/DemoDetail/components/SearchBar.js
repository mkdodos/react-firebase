import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

export default function SearchBar({ dispatch }) {
  const [date, setDate] = useState(new Date().toISOString().substring(0,10));
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Field>
            
            <Form.Input
              type="date"
              name="transDate"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </Form.Field>
          <Form.Field>
            <Form.Button
              onClick={() => dispatch({ type: 'SEARCH', payload: { date } })}
            >
              查詢
            </Form.Button>
          </Form.Field>
        </Form.Group>
      </Form>
    </div>
  );
}
