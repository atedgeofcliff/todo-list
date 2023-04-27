import { LogoutOutlined } from "@ant-design/icons";
import { Button, Image, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AppHeader() {
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.setItem("user", null);
    localStorage.clear();

    navigate("/login", { replace: true });
  };
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px",
      }}
    >
      {
        <Image
          style={{
            flex: " 0 0 50%",
            display: "flex",
            justifyContent: "flex-start",
          }}
          width={40}
          src={
            "https://icon-library.com/images/todo-list-icon/todo-list-icon-19.jpg"
          }
        ></Image>
      }
      <Typography.Title style={{ color: "white", alignItems: "center" }}>
        Todo List App
      </Typography.Title>
      <Button
        type="dashed"
        shape="circle"
        icon={<LogoutOutlined />}
        onClick={onClick}
      />
    </Header>
  );
}
