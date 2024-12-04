import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import { db } from '../../../utils/firebase';

export default function StockPrice() {
  const [loading, setLoading] = useState(false);

  // 日期 yyyymm / 202410;
  const getDate = () => {
    const date = new Date();
    let mm = date.getMonth() + 1;
    if (mm < 10) {
      mm = '0' + mm;
    }

    // 20241001
    return date.getFullYear().toString() + mm + '01';
  };

  const getPriceAndUpdate = (id, stockNo) => {
    const date = getDate();
    const url = `https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY?date=${date}&stockNo=${stockNo}&response=json`;
    axios.get(url).then((res) => {
      // 日期查到的資料是整月,取得最後一筆為最近一日
      const len = res.data.data.length;
      // 資料有多個欄位 , 6 為收盤價
      const price = res.data.data[len - 1][6];

      console.log(url);
      console.log(stockNo);

      // 用查詢到的收盤價更新資料
      db.collection('stockMaster').doc(id).update({ price });
    });
  };

  // 取得所有股票代號
  // 組合資料(doc.id,現價)
  const handleUpdate = () => {
    setLoading(true);
    db.collection('stockMaster')
      .get()
      .then((snapshot) => {
        const docs = snapshot.docs;
        // console.log(docs[0].data())
        // const doc = docs[2];
        // getPriceAndUpdate(doc.id, doc.data().stockNo);
        snapshot.docs.map((doc, index) => {
          // console.log(doc.data().stockNo)
          // console.log(doc.id)
          // console.log(index)
          getPriceAndUpdate(doc.id, doc.data().stockNo);
        });
        setLoading(false);
      });
  };

  return (
    <Button loading={loading} onClick={handleUpdate}>
      更新股價
    </Button>
  );
}
