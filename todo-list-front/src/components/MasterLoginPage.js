import { Button, Form, Input, Row, Typography } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user";

export default function MasterLoginPage() {
  const navigate = useNavigate();
  const redirectToMainPage = () => {
    navigate("/", { replace: true });
  };
  const masterLogin = useMutation({
    mutationFn: (loginCredentials) =>
      UserService.login(loginCredentials).then((res) => {
        if (res.id) {
          localStorage.setItem("user", res.id);
          redirectToMainPage();
        }
      }),
  });
  const onFinish = (values) => {
    const loginCredentials = {
      email: values.email,
      password: values.password,
    };
    masterLogin.mutate(loginCredentials);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
    >
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
        <Typography.Title
          style={{ marginBottom: "64px", color: "black", alignItems: "center" }}
        >
          Master Login
        </Typography.Title>
        <Form.Item label="email" name="email" rules={[{ type: "email" }]}>
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
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
}
