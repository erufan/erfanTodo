"use client";
import { Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { logIn } from "@/services/actions";
import { useState } from "react";
import MyError from "@/interface/MyError";
import User from "@/interface/User";

const LoginForm = () => {
  const [error, setError] = useState("");
  const handleOnFinish = async function (user: User) {
    const response: MyError = await logIn(user);

    !response.success && setError(response.message);
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
          <Alert
            message={
              "wrong password and username : please check your username and password"
            }
            type="error"
            showIcon
          />
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
