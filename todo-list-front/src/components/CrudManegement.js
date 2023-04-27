import { Layout, Space, Switch, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import { state } from "../services/state";
import AppSideMenu from "./AppPages/AppSideMenu";
import AppHeader from "./AppPages/AppHeader";
import { useMutation, useQuery } from "@tanstack/react-query";
import UserService from "../services/user";
const { Text } = Typography;

export default function CrudManegement() {
  const userId = localStorage.getItem("user");
  const { data: permissions } = useQuery(["permissions"], () =>
    UserService.getPermissions(userId)
  );
  const permissionArray = ["create", "read", "update", "delete"];

  useEffect(() => {
    if (permissions) {
      permissionArray.forEach((permission) => {
        let permissionStateName = permission + "Permission";
        permissions[permission]
          ? (state[permissionStateName] = true)
          : (state[permissionStateName] = false);
      });
    }
  }, [permissions]);
  const updatePermision = useMutation({
    mutationFn: (data) => UserService.updatePermission(data),
  });

  function onChange(value, funcName) {
    updatePermision.mutate({
      id: userId,
      process: funcName,
    });
    // eval("set" + funcName + "Checked" + "(" + value + ")");
    state[funcName + "Permission"] = value;
  }
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <AppSideMenu></AppSideMenu>
      <Layout>
        <AppHeader></AppHeader>

        <Content
          className="site-layout"
          style={{
            padding: "0 50px",
            marginTop: 64,
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 80,
              background: "#fff",
            }}
          >
            <Space wrap style={{ width: "100%", justifyContent: "center" }}>
              <Switch
                defaultChecked={state.createPermission}
                onChange={(value) => onChange(value, "create")}
              />
              <Text>Create</Text>
              <Switch
                defaultChecked={state.readPermission}
                onChange={(value) => onChange(value, "read")}
              />
              <Text>Read</Text>
              <Switch
                defaultChecked={state.updatePermission}
                onChange={(value) => onChange(value, "update")}
              />
              <Text>Update</Text>
              <Switch
                defaultChecked={state.deletePermission}
                onChange={(value) => onChange(value, "delete")}
              />
              <Text>Delete</Text>
            </Space>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
