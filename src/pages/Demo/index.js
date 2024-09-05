import React, { useEffect, useState } from 'react';
import { db } from '../../utils/firebase';
import { Modal, Button } from 'semantic-ui-react';
import TableView from './components/TableView';
import TableViewEdit from './components/TableViewEdit';
import axios from 'axios';
import EditForm from './components/EditForm';
import schema from './data/schema.json';



export default function index() {
  // const columns = schema.tables[0].columns 
 



  const [rows, setRows] = useState([]);
  // 文件集合名稱
  const colName = 'stockTransaction';
  // const colName = 'balances';
  // const colName = 'cates';


  const columns = schema.tables.find((t) => t.table == colName).columns;


  // 表單開關
  const [open, setOpen] = useState(false);

  // 傳給 TableView
  // 欄位 key 為顯示內容 ,  value 為顯示標題
  // const obj = {
  //   dateField: '日期',
  //   itemName: '項目',
  //   amt: '支出',
  //   qty: '股數',
  // };


  useEffect(() => {
    fetchFirebase();
    // fetchAccess();
  }, []);

  const fetchFirebase = async () => {
    const snapshot = await db.collection(colName).limit(10).get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setRows(data);
    // console.log(data);
  };

  const fetchAccess = () => {
    const url = `http://localhost:8888/pdo-echoway/expense/read.php`;
    axios
      .get(url)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setRows(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const handleAdd = () => {
    setOpen(true);
  };

  const handleEdit = () => {
    console.log('edit');
  };

  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        closeIcon
      >
        <Modal.Header>標題</Modal.Header>
        <Modal.Content>
          <EditForm columns={columns} />
        </Modal.Content>
        <Modal.Actions>
          <Button primary>儲存</Button>
          <Button floated="left" color="red">
            刪除
          </Button>
        </Modal.Actions>
      </Modal>

      <TableViewEdit
        rows={rows}
       
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        columns={columns}
      />
      {/* <TableView rows={rows} obj={obj} /> */}
    </>
  );
}
