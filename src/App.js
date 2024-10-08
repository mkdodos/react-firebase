import React from 'react';
import { Container, Table } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Maya from './pages/Maya';
import Stock from './pages/Stock';
import Money from './pages/Money'
import Demo from './pages/Demo'
import Demo1 from './pages/Demo1'
import Demo2 from './pages/Demo2'
import Demo3 from './pages/Demo3'
import Demo4 from './pages/Demo4'
import Demo5 from './pages/Demo5'
import DemoMaster from './pages/DemoMaster'
import DemoDetail from './pages/DemoDetail'


export default function App() {
  
  return (
    <Container>
      <BrowserRouter>
        <Navbar />
        <Routes>
        {/* <Route path="/react-firebase/build" element={<Money />} /> */}
          <Route path="/" element={<Stock />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/maya" element={<Maya />} />
          <Route path="/money" element={<Money />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/demo1" element={<Demo1 />} />
          <Route path="/demo2" element={<Demo2 />} />
          <Route path="/demo3" element={<Demo3 />} />
          <Route path="/demo4" element={<Demo4 />} />
          <Route path="/demo5" element={<Demo5 />} />
          <Route path="/demo-detail" element={<DemoDetail />} />
          <Route path="/demo-detail/:stockName" element={<DemoDetail />} />
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
