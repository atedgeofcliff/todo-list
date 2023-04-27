import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Modal } from "antd";
import React from "react";
import UserService from "../services/user";

export default function AddNewUser({ isModalOpen, setIsModalOpen }) {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    const addnewUserData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    saveUser.mutate(addnewUserData);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const saveUser = useMutation({
    mutationFn: (addnewUserData) => UserService.addNewUser(addnewUserData),
  });
  return (
    <Modal footer={null} open={isModalOpen}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            style={{ float: "right", marginBottom: "10px" }}
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
          <Button
            style={{
              float: "right",
              marginBottom: "10px",
              marginRight: "10px",
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
