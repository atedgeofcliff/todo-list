import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { UserOutlined, FileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
export default function AppSideMenu() {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const items = [
    { label: "Management", key: "/management", icon: <UserOutlined /> },
    { label: "Todos", key: "/", icon: <FileOutlined /> },
  ];
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
      <Menu
        onClick={(item) => {
          navigate(item.key);
        }}
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
}
