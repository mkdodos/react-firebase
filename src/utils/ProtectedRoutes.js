import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ user1, Permission }) => {
  // console.log(user)

  // let user=localStorage.getItem('user');
  // if(user){
  //   user = JSON.parse(user);
  //   user = { ...user, permission: ['Admin'] };
  // }


  // 沒登入導向登入頁
  // 判斷登入使用者權限是否符合
  // return user.login &&
  //   user.permission.find((per) => Permission.includes(per)) ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/login" />
  // );
};

export default ProtectedRoutes;
