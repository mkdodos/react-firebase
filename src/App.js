import React from 'react';
import { Container, Table } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Maya from './pages/Maya';
import Stock from './pages/Stock';

import ProtectedRoutes from './utils/ProtectedRoutes';

// 使用者權限
const Permission = {
  User: 'User',
  Admin: 'Admin',
};

export default function App() {
  // https://wei-docusaurus-vercel.vercel.app/docs/React/Package/React-Protected-Routes
  // const user = { login: true, permission: ['User'] };
  const user = { login: true, permission: ['Admin'] };
  // const user = { login: true };
  return (
    <Container>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* 受保謢的路由 */}
          {/* 權限為管理員才能查看 */}

          <Route
            element={
              <ProtectedRoutes user={user} Permission={[Permission.Admin]} />
            }
          >
            <Route path="/stock" element={<Stock />} />
          </Route>

          {/* 權限為管理員和使用者都能查看 */}
          <Route
            element={
              <ProtectedRoutes
                user={user}
                Permission={[Permission.Admin, Permission.User]}
              />
            }
          >
            <Route path="/maya" element={<Maya />} />
          </Route>

          {/* <Route path="/stock" element={<Stock />} /> */}
          {/* <Route path="/maya" element={<Maya />} /> */}
        </Routes>
      </BrowserRouter>
    </Container>
  );
}
