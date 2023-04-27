import React from "react";
import MainPage from "../MainPage";
import LoginPage from "../LoginPage";
import CrudManegement from "../CrudManegement";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import MasterMain from "../MasterMain";

const PrivateRoutes = ({ redirectPath }) => {
  let auth = {
    token:
      redirectPath === "/login"
        ? localStorage.getItem("user")
        : localStorage.getItem("masterUser"),
  };
  return auth.token ? <Outlet /> : <Navigate to={redirectPath} />;
};
export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoutes redirectPath="/login" />}>
          <Route element={<MainPage />} path="/" exact />
          <Route element={<CrudManegement />} path="/management" exact />
        </Route>
        <Route element={<PrivateRoutes redirectPath="/masterLogin" />}>
          <Route element={<MasterMain />} path="/masterMain" exact />
        </Route>
        <Route element={<LoginPage />} path="/login" />

        <Route element={<LoginPage />} path="/masterLogin" />

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </div>
  );
}
