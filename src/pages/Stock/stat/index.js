import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/firebase';

import TableView from './components/TableView';
import EditForm from './components/EditForm';

export default function Index({
  statRows,
  setStatRows,
  handleRowClick,
  transactionRows,
}) {
  useEffect(() => {
    let data = cals();
    // 依報酬率排序
    // data.sort((a, b) => {
    //   return a.bonusPercent > b.bonusPercent ? 1 : -1;
    // });

    // 依股票代號排序
    // data.sort((a, b) => {
    //   return a.stockId > b.stockId ? 1 : -1;
    // });
    // console.log(cals());
    setStatRows(data);
  }, [transactionRows]);

  //  firebase 文件集合名稱
  const colName = 'stockStat';

  // 計算各項數值
  const cals = () => {
    // setLoading(false);
    let temp = statRows.slice();
    // 全部股票成本
    let allCost = 0;
    let allBonus = 0;
    let allPrice = 0; //總市值
    statRows.map((stock, index) => {
      let sum = 0;
      let sumQty = 0; //股數
      let sumPrice = 0; //現值
      let tempRows = transactionRows.filter((obj) => obj.name == stock.name);
      if (tempRows.length == 0) {
        // 沒有交易記錄時將原本數值清空
        temp[index] = {
          ...stock,
          totalCost: '',
          bouns: '',
          avgCost: '',
          qtys: '',
        };
        return;
      }

      // 有個股交易記錄計算數值
      tempRows.map((row) => {
        sum += Number(row.cost) * Number(row.qty);
        sumQty += Number(row.qty);
        sumPrice += Number(row.qty) * Number(stock.price);
      });

      // 平均成本
      const avgCost = sum / sumQty;
      // 損益
      const bonus = (stock.price - avgCost) * sumQty;

      allCost += sum;
      allBonus += bonus;
      allPrice += sumPrice;

      temp[index] = {
        ...stock,
        totalCost: sum,
        totalPrice: sumPrice,
        qtys: sumQty,
        avgCost: avgCost,
        bonus: bonus,
        bonusColor: bonus > 0 ? 'red' : 'green',
        bonusPercent: bonus / sum,
      };
    });

    setAllStockAmt({
      cost: allCost,
      bonus: allBonus,
      price: allPrice,
      bonusPercent: allBonus / allCost,
    });
    return temp;
  };

  // 相對應的交易記錄
  const stockTransaction = (stockName) => {
    let tempRows = transactionRows.filter((obj) => obj.name == stockName);
    return tempRows;
  };

  /********** 變數 ************/
  // 欄位
  const defaultRow = {
    name: '', // 股票名稱
    price: '', // 現價
    qtys: '', //總股數
    totalCost: '', //總成本
    avgCost: '', //平均成本
    bouns: '', //損益
  };
  // 資料
  const [rows, setRows] = useState([]);
  // 編輯列
  const [row, setRow] = useState(defaultRow);
  // 編輯列索引
  const [rowIndex, setRowIndex] = useState(defaultRow);
  // 表單開關
  const [open, setOpen] = useState(false);

  const [allStockAmt, setAllStockAmt] = useState({
    totalCost: 0,
    totalBouns: 0,
  });

  /********** 方法 ************/
  const handleAdd = () => {
    setOpen(true);
    setRowIndex(-1);
    setRow(defaultRow);
  };

  // 儲存(新增或修改)
  const handleSave = () => {
    // 依照有編輯列索引值決定做新增或修改
    if (rowIndex == -1) {
      db.collection(colName)
        .add(row)
        .then((docRef) => {
          // 將編輯列加入資料陣列
          setStatRows([...statRows, { ...row, id: docRef.id }]);
        });
    } else {
      // 修改表格中編輯列的值
      db.collection(colName)
        .doc(row.id)
        .update(row)
        .then(() => {
          const tempRows = statRows.slice();
          Object.assign(tempRows[rowIndex], row);
          setStatRows(tempRows);
          setRowIndex(-1);
          // 有該股的交易記錄,再做數值計算更新
          if (stockTransaction(row.name).length > 0) {
            setStatRows(cals());
          }
        });
    }

    // 關閉編輯視窗
    setOpen(false);
    // 將編輯列資料設定回預設值
    setRow(defaultRow);
  };

  // 刪除
  const handleDelete = () => {
    db.collection(colName)
      .doc(row.id)
      .delete()
      .then(() => {
        setStatRows(statRows.filter((obj) => obj.id != row.id));
        setOpen(false);
      });
  };

  // 按下編輯鈕
  const handleEdit = (editedRow, index) => {
    setRow(editedRow);
    setRowIndex(index);
    setOpen(true);
  };

  // 修改欄位值
  const handleChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <TableView
        rows={statRows}
        setStatRows={setStatRows}
        handleEdit={handleEdit}
        handleAdd={handleAdd}
        allStockAmt={allStockAmt}
        handleRowClick={handleRowClick}
      />

      <EditForm
        open={open}
        setOpen={setOpen}
        row={row}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleChange={handleChange}
      />
    </div>
  );
}
