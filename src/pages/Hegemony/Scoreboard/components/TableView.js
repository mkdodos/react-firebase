import { Table, Button } from "semantic-ui-react";
// import "./style.css"

export default function TableView({ state, columns, handleAdd, handleEdit }) {
  const { data, loading } = state;

  // 篩選可顯示欄位
  columns = columns.filter((col) => col.viewable);

  return (
    <>
      <Table celled unstackable className="scoreboard">
        <Table.Header>
          <Table.Row>
            {columns.map((col, index) => {
              return (
                <Table.HeaderCell key={index}>{col.title}</Table.HeaderCell>
              );
            })}
            <Table.HeaderCell>
              <Button primary onClick={handleAdd} loading={loading}>
                新增
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((row, index) => {
            return (
              <Table.Row key={row.id}>
                {columns.map((col, index) => {
                  if (col.dataKey == "role") {
                    console.log(row)
                    return (
                      <Table.Cell className={row.role} key={index}>
                        {row.roleText}
                      </Table.Cell>
                    );
                  }

                  return (
                    <Table.Cell  key={index}>
                      {row[col.dataKey]}
                    </Table.Cell>
                  );
                })}
                <Table.Cell>
                  <Button onClick={() => handleEdit(row, index)}>編輯</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
