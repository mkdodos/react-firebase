import React from 'react';
import { Container, Table } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Maya from './pages/Maya';
import Stock from './pages/Stock';

// import ProtectedRoutes from './utils/ProtectedRoutes';

// 使用者權限
const Permission = {
  User: 'User',
  Admin: 'Admin',
};

export default function App() {
  // const user = localStorage.getItem('user');
  // let user =JSON.parse(localStorage.getItem('user'));

  // let user=localStorage.getItem('user');
  // if(user){
  //   user = JSON.parse(user);
  //   user = { ...user, permission: ['Admin'] };
  // }

  
  // const user = { login: false, permission: ['Admin'] };
  // const user = { login: true, permission: ['Admin'] };
  return (
    <Container>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/maya" element={<Maya />} />

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
