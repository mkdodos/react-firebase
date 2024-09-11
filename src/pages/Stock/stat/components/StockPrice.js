import React,{useState} from 'react';
import axios from 'axios';
import { db } from '../../../../utils/firebase';
import { Button } from 'semantic-ui-react';

export default function StockPrice() {
  
  const [loading, setLoading]=useState(false)

  // 日期 'yyyymm';
  const getDate = () => {
    const date = new Date();
    let mm = date.getMonth()+1;
    if (mm < 10) {
      mm = '0' + mm;
    }

    return date.getFullYear().toString() + mm+'01';
  };

  const date = getDate();

  // const date = "20240801"

  // 取得所有股票代號
  // 組合資料(doc.id,現價)
  const getAllStocks = () => {
    setLoading(true)
    db.collection('stockStat')
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          getPrice(doc.id, doc.data().stockId);
        });
        setLoading(false)
      });
     
  };

  // 從證交所網站查詢資料
  // https://www.twse.com.tw/zh/trading/historical/stock-day.html

  // 從 CHROME 主控台 選擇網路,點選該名稱,在右方標頭會出現實際取得資料網址
  // https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY?date=20240911&stockNo=2330&response=json&_=1726017431256

  // 用此網址替換掉日期和股票代號進行查詢
  const getPrice = (id, stockNo) => {
    const url = `https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY?date=${date}&stockNo=${stockNo}&response=json`;
    axios.get(url).then((res) => {
      // 日期查到的資料是整月,取得最後一筆為最近一日
      const len = res.data.data.length;
      // 資料有多個欄位 , 6 為收盤價
      const price = res.data.data[len - 1][6];
      console.log(date);
      // 用查詢到的收盤價更新資料
      db.collection('stockStat').doc(id).update({ price });
    });
  };

  return (
    <div>
      <Button loading={loading} onClick={getAllStocks}>更新股價</Button>
    </div>
  );
}
