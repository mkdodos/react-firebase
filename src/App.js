import React from 'react';
import { Container, Table } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Maya from './pages/Maya';
import Wedding from './pages/Wedding';
import Stock from './pages/Stock';
import Stock2025 from "./pages/Stock2025"
import Asset2025 from "./pages/Asset2025"
import Money from './pages/Money';
import Demo from './pages/Demo';
import Demo1 from './pages/Demo1';
import StockBasic from './pages/StockBasic';
import StockMaster from './pages/StockMaster';
import StockDetail from './pages/StockDetail';
import StockMoney from './pages/StockMoney';

// import TableListSmall from './pages/StockMaster/components/TableListSmall';
import Demo4 from './pages/Demo4';
import Demo5 from './pages/Demo5';
import DemoMaster from './pages/DemoMaster';
import DemoDetail from './pages/DemoDetail';

import Test from './pages/Test'

export default function App() {
  return (
    <Container>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/react-firebase/build" element={<Money />} /> */}
          <Route path="/" element={<Stock2025 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wedding" element={<Wedding />} />
          <Route path="/test" element={<Test />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/stock2025" element={<Stock2025 />} />
          <Route path="/asset2025" element={<Asset2025 />} />
          <Route path="/maya" element={<Maya />} />
          <Route path="/money" element={<Money />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/demo1" element={<Demo1 />} />
          <Route path="/stock-money" element={<StockMoney />} />
          <Route path="/stock-basic" element={<StockBasic />} />
          <Route path="/stock-master" element={<StockMaster />} />
          {/* <Route path="/stock-master-simple" element={<TableListSmall />} /> */}
          <Route path="/stock-detail" element={<StockDetail />} />
          {/* 依有無結束日設定不同路由 */}
          <Route
            path="/stock-detail/:stockName/fromDate/:fromDate/toDate"
            element={<StockDetail />}
          />
          <Route
            path="/stock-detail/:stockName/fromDate/:fromDate/toDate/:toDate"
            element={<StockDetail />}
          />
          <Route path="/demo4" element={<Demo4 />} />
          <Route path="/demo5" element={<Demo5 />} />
          <Route path="/demo-detail" element={<DemoDetail />} />
          <Route path="/demo-detail/:stockName" element={<DemoDetail />} />
          <Route
            path="/demo-detail/:stockName/fromDate/:fromDate"
            element={<DemoDetail />}
          />
          <Route
            path="/demo-detail/:stockName/fromDate/:fromDate/toDate"
            element={<DemoDetail />}
          />
          <Route
            path="/demo-detail/:stockName/fromDate/:fromDate/toDate/:toDate"
            element={<DemoDetail />}
          />
          <Route path="/demo-master" element={<DemoMaster />} />

          {/* 受保謢的路由 */}
          {/* 權限為管理員才能查看 */}
          {/* <Route
            element={
              <ProtectedRoutes user={user} Permission={[Permission.Admin]} />
            }
          >
            <Route path="/stock" element={<Stock />} />
          </Route> */}

          {/* 權限為管理員和使用者都能查看 */}
          {/* <Route
            element={
              <ProtectedRoutes
                user={user}
                Permission={[Permission.Admin, Permission.User]}
              />
            }
          >
            <Route path="/maya" element={<Maya />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </Container>
  );
}
