"use client";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { logIn } from "@/services/actions";

const LoginForm = () => {
  const { Item } = Form;
  return (
    <Form
      name="login_form"
      className="login-form"
      initialValues={{ remember: true }}
      style={{ maxWidth: "300px", margin: "auto", paddingTop: "50px" }}
      onFinish={logIn}
    >
      <Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Item>
      <Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Item>
      <Item style={{ display: "flex", justifyContent: "center" }}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Item>
    </Form>
  );
};

export default LoginForm;
