import React from "react";
import "./App.css";
import "antd/dist/reset.css";
import AppRoutes from "./components/AppPages/AppRoutes";

export default function App() {
  return (
    <div className="App">
      <AppRoutes></AppRoutes> {/* <MainPage></MainPage> */}
    </div>
  );
}
