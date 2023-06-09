import { Button, Form, Input, Row } from "antd";
import UserService from "../services/user";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { state } from "../services/state";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const login = useMutation({
    mutationFn: (loginCredentials) =>
      UserService.login(loginCredentials).then((res) => {
        if (res.id) {
          if (location.pathname === "/login") {
            localStorage.removeItem("masterUser");
            localStorage.setItem("user", res.id);
            navigate("/", { replace: true });
            state.masterPermissions = res.get_permission;
            state.userId = res.id;
          }
          if (location.pathname === "/masterLogin") {
            localStorage.removeItem("user");
            localStorage.setItem("masterUser", res.id);
            navigate("/masterMain", { replace: true });
          }
        }
      }),
  });

  const onFinish = (values) => {
    const loginCredentials = {
      email: values.email,
      password: values.password,
      is_master: location.pathname === "/masterLogin",
    };
    login.mutate(loginCredentials);
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
