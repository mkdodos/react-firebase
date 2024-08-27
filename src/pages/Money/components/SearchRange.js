import React from 'react'
import { Form, Search } from 'semantic-ui-react'

export default function SearchRange({
  loading,handleQueryRange,setSearch,search
}) {
  const handleChange = (e)=>{
    setSearch({...search,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <Form>
        <Form.Group inline>
          
          <Form.Input label='參加人數' name='from' onChange={handleChange}  />
          <Form.Input label='-' name='to' onChange={handleChange} />
          <Form.Button loading={loading} color="teal" onClick={handleQueryRange}>
            查詢
          </Form.Button>         
        </Form.Group>
      </Form>
    </div>
  )
}
