import { Button, Layout, Space, Switch, Table, Typography } from "antd";
import React, { useState } from "react";
import AppHeader from "./AppPages/AppHeader";
import { Content } from "antd/es/layout/layout";
import UserService from "../services/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import AddNewUser from "./AddNewUser";

const { Text } = Typography;

export default function MasterMain() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];
  const updatePermision = useMutation({
    mutationFn: (data) => UserService.updatePermission(data),
  });

  const { data: users } = useQuery(["users"], () => UserService.getUsers());

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Layout>
        <AppHeader></AppHeader>

        <Content
          className="site-layout"
          style={{
            padding: "0 50px",
            marginTop: 60,
          }}
        >
          <Button
            style={{ float: "right", marginBottom: "10px" }}
            onClick={() => setIsModalOpen(true)}
          >
            Add New User
          </Button>
          <AddNewUser
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />

          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) =>
                record.get_permission
                  .filter((perm) => perm.user_id !== perm.from_user_id)
                  .map((perm) => (
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
                          minHeight: 180,
                          background: "#fff",
                        }}
                      >
                        <Space
                          wrap
                          style={{ width: "100%", justifyContent: "center" }}
                        >
                          <Switch
                            defaultChecked={perm.create ? true : false}
                            onChange={(value) =>
                              updatePermision.mutate({
                                id: perm.user_id,
                                process: "create",
                              })
                            }
                          />
                          <Text>Create</Text>
                          <Switch
                            defaultChecked={perm.read ? true : false}
                            onChange={(value) =>
                              updatePermision.mutate({
                                id: perm.user_id,
                                process: "read",
                              })
                            }
                          />
                          <Text>Read</Text>
                          <Switch
                            defaultChecked={perm.update ? true : false}
                            onChange={(value) =>
                              updatePermision.mutate({
                                id: perm.user_id,
                                process: "update",
                              })
                            }
                          />
                          <Text>Update</Text>
                          <Switch
                            defaultChecked={perm.delete ? true : false}
                            onChange={(value) =>
                              updatePermision.mutate({
                                id: perm.user_id,
                                process: "delete",
                              })
                            }
                          />
                          <Text>Delete</Text>
                        </Space>
                      </div>
                    </Content>
                  )),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            dataSource={users}
          />
        </Content>
      </Layout>
    </Layout>
  );
}
