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

      console.log(stockNo, price);

      // 用查詢到的收盤價更新資料
      db.collection('master').doc(id).update({ price });
    });
  };

  // 取得所有股票代號
  // 組合資料(doc.id,現價)
  const handleUpdate = () => {
    setLoading(true);
    db.collection('master')
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          getPriceAndUpdate(doc.id, doc.data().stockNo);
        });
        setLoading(false);
      });
  };

  // console.log(getPrice(2609));

  return (
    <div>
      <Button loading={loading} onClick={handleUpdate}>
        更新股價
      </Button>
    </div>
  );
}
