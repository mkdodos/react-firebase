import React, { useEffect, useState } from 'react';
import { Button, TabPane, Tab, Modal, Table } from 'semantic-ui-react';
import { db } from '../../utils/firebase';
import Stat from './stat/index';
import Transaction from './transaction';
import GroupView from './transaction/components/GroupView';

export default function Index() {
  const [loading, setLoading] = useState(false);

  // 個股資料
  const [statRows, setStatRows] = useState([]);

  // 交易資料
  const [transactionRows, setTransactionRows] = useState([]);
  // 交易資料複本(篩選用)
  const [transactionRowsCopy, setTransactionRowsCopy] = useState([]);

  // 交易資料 Modal
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchStatData();
    fetchTransactionData();
  }, []);

  const fetchStatData = async () => {
    const snapshot = await db.collection('stockStat').get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    // 依股票代號排序
    data.sort((a, b) => {
      return a.stockId > b.stockId ? 1 : -1;
    });

    setStatRows(data);
    console.log('Lv1');
  };

  const fetchTransactionData = async () => {
    setLoading(false);
    const snapshot = await db.collection('stockTransaction').get();
    let data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    // 依日期排序(最新在前)
    data.sort((a, b) => {
      return a.date < b.date ? 1 : -1;
    });

    // console.log(data);
    setTransactionRows(data);
    setTransactionRowsCopy(data);
    setLoading(true);
    // console.log(data);
  };

  // stat 股票列 , 取得該列的股票名稱
  // 篩選出該股票交易明細
  const handleStatRowClick = (row) => {
    setTransactionRows(
      transactionRowsCopy.filter((obj) => obj.name == row.name)
    );
    setOpen(true);
  };

  // 篩選後,需要顯示全部資料時,可按
  const handleShowAll = () => {
    setTransactionRows(transactionRowsCopy);
  };

  const panes = [
    {
      menuItem: '統計',
      render: () => (
        <TabPane>
          <Stat
            statRows={statRows}
            setStatRows={setStatRows}
            transactionRows={transactionRows}
            handleRowClick={handleStatRowClick}
          />

          <Modal
            onClose={() => {
              setOpen(false);
              handleShowAll();
            }}
            onOpen={() => setOpen(true)}
            open={open}
            closeIcon
          >
            <Modal.Header>交易明細</Modal.Header>
            <Modal.Content>
              <Transaction
                handleShowAll={handleShowAll}
                statRows={statRows}
                transactionRows={transactionRows}
                setTransactionRows={setTransactionRows}
                setTransactionRowsCopy={setTransactionRowsCopy}
                loading={loading}
                setLoading={setLoading}
                tableOpen={open}
                setTableOpen={setOpen}
              />
            </Modal.Content>
            {/* <Modal.Actions>
              <Button onClick={handleShowAll}>全部</Button>
            </Modal.Actions> */}
          </Modal>
        </TabPane>
      ),
    },
    {
      menuItem: '明細',
      render: () => (
        <>
          <TabPane>
            <Transaction
              handleShowAll={handleShowAll}
              statRows={statRows}
              transactionRows={transactionRows}
              setTransactionRows={setTransactionRows}
              transactionRowsCopy={transactionRowsCopy}
              setTransactionRowsCopy={setTransactionRowsCopy}
              loading={loading}
              setLoading={setLoading}
              tableOpen={open}
              setTableOpen={setOpen}
            />
          </TabPane>
        </>
      ),
    },
    {
      menuItem: '金額依日期統計',
      render: () => (
        <>
          <TabPane>
            <GroupView rows={transactionRows} />
          </TabPane>
        </>
      ),
    },
  ];

  const handleTabChange = (e, data) => {
    // if (data.activeIndex == 1) {
    //   setOpen(true);
    // }
  };

  return (
    <>
      <Tab panes={panes} onTabChange={handleTabChange} />
    </>
  );
}
