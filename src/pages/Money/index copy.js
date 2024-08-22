import React from 'react';
import axios from 'axios';
import { db } from '../../utils/firebase';
import { Button } from 'semantic-ui-react';

export default function index() {
  const fetchData = () => {
    // const url = `http://localhost:8888/money2022mysql/select.php`;
    const url = `http://localhost:8888/pdo-inviMysql/select.php`;
    // const url = `../db/mysql/money/select.php`;
    axios
      .get(url)
      .then(function (response) {
        // handle success
        const rows = response.data
        // db.collection('wedding2022')
        // console.log(rows[0]);
        // rows.map(row=>addDoc(row))
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };


  // fetchData()


  const addDoc = (row) => {
   
    // db.collection('wedding2022')
    //   .add(row)
    //   .then((docRef) => {
    //     console.log('Document written with ID: ', docRef.id);
    //   })
    //   .catch((error) => {
    //     console.error('Error adding document: ', error);
    //   });
  };

  // addDoc()



  return <div><Button onClick={fetchData}>轉資料</Button></div>;
}
