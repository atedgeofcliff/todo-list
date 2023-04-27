import { Route, Navigate, Routes } from "react-router-dom";
import React from "react";

function PrivateRoute({ component: Component, ...rest }) {
  const authUser = localStorage.getItem("user");
  return (
    <Routes>
      <Route
        {...rest}
        render={(props) => {
          if (!authUser) {
            return <Route path="*" element={<Navigate to="/login" />} />;
          } else if (authUser !== false) {
            return <Component {...props} />;
          }
        }}
      />
    </Routes>
  );
}
export { PrivateRoute };
