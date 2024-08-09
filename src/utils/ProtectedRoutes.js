import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ user,Permission }) => {
  // 沒登入導向登入頁
  // 判斷登入使用者權限是否符合
  return user.login &&   user.permission.find((per) => Permission.includes(per)) ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;