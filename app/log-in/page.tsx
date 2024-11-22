"use client";
import { Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { logIn } from "@/services/actions";
import { useState } from "react";
import User from "@/interface/User";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const handleOnFinish = async function (user: User) {
    const response = await logIn(user);

    setError(response?.message);
  };

  const { Item } = Form;
  return (
    <Form
      name="login_form"
      className="login-form"
      initialValues={{ remember: true }}
      style={{ maxWidth: "300px", margin: "auto", paddingTop: "50px" }}
      onFinish={handleOnFinish}
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
      {error && (
        <Item>
          <Alert message={error} type="error" showIcon />
        </Item>
      )}
      <Item style={{ display: "flex", justifyContent: "center" }}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Item>
    </Form>
  );
};

export default LoginForm;
