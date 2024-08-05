import React from 'react'
import { Container,Table } from 'semantic-ui-react'

export default function App() {
  return (
    <Container>
       <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>表格標題</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>表格內容</Table.Cell>
          </Table.Row>
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>表格底</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>    
    </Container>
  )
}
