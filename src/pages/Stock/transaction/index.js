import React, { useEffect, useState } from 'react';
import { db } from '../../../utils/firebase';

import TableView from './components/TableView';
import EditForm from './components/EditForm';

export default function Index({
  transactionRows,
  transactionRowsCopy,
  setTransactionRows,
  setTransactionRowsCopy,
  statRows,
  handleShowAll,
  tableOpen,
  setTableOpen,
}) {
  /********** 變數 ************/
  // 欄位
  const defaultRow = {
    date: new Date().toISOString().substring(0, 10), //交易日期
    name: '', // 股票名稱
    cost: '', // 購入單價
    qty: '', //股數
  };

  // 編輯列
  const [row, setRow] = useState(defaultRow);
  // 編輯列索引
  const [rowIndex, setRowIndex] = useState(defaultRow);
  // 表單開關
  const [open, setOpen] = useState(false);

  // firebase 文件集合名稱
  const colName = 'stockTransaction';

  // 買進賣出
  const [isSold, setIsSold] = useState(false);

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
      console.log(isSold);

      const rowCopy = row;
      if (isSold) {
        rowCopy.qty = rowCopy.qty*-1; 
        // setRow({ ...row, qty: row.qty * -100 });
      }

      
      // row.qty = row.qty*-1; 
      // console.log(row);
      // return;
      db.collection(colName)
        .add(rowCopy)
        .then((docRef) => {
          // 將編輯列加入資料陣列
          setTransactionRows([{ ...rowCopy, id: docRef.id }, ...transactionRows]);
          setTransactionRowsCopy([{ ...rowCopy, id: docRef.id }, ...transactionRowsCopy]);
        });
    } else {
      // 修改表格中編輯列的值
      db.collection(colName)
        .doc(row.id)
        .update(row)
        .then(() => {
          // 修改表格中編輯列的值
          const tempRows = transactionRows.slice();
          Object.assign(tempRows[rowIndex], row);
          setTransactionRows(tempRows);
          // setTransactionRowsCopy(tempRows);
          setRowIndex(-1);
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
        setTransactionRows(transactionRows.filter((obj) => obj.id != row.id));
        setTransactionRowsCopy(transactionRowsCopy.filter((obj) => obj.id != row.id));
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
    const name = e.target.name;
    let value = e.target.value;

    // if (name == 'qty') {
    //   value = value * -1;
    // }

    // console.log(value);
    setRow({ ...row, [name]: value });
  };

  // 修改股票名稱下拉選項值
  const handleStockNameChange = (e, { value }) => {
    console.log(value);
    setRow({ ...row, name: value });
  };

  const handleSold = (value) => {
    setRow({ ...row, qty: value * -1 });
    console.log('sold');
  };

  return (
    <>
      <TableView
        handleShowAll={handleShowAll}
        rows={transactionRows}
        handleEdit={handleEdit}
        handleAdd={handleAdd}
        open={tableOpen}
        setOpen={setTableOpen}
      />
      <EditForm
        isSold={isSold}
        setIsSold={setIsSold}
        statRows={statRows}
        open={open}
        setOpen={setOpen}
        row={row}
        handleSold={handleSold}
        rowIndex={rowIndex}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleChange={handleChange}
        handleStockNameChange={handleStockNameChange}
      />
    </>
  );
}
