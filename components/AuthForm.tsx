"use client";
import { Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useFormState } from "react-dom";
import { login, signup } from "@/serverAction/auth";
import isValidCredential from "@/util/auth/isValidCredential";
import { UserCredentialErrors } from "@/interface/UserCredential";
import Link from "next/link";

interface Props {
  param: "log-in" | "sign-up";
}

const AuthForm = ({ param }: Props) => {
  let authAction = param === "sign-up" ? signup : login;
  const [formState, formAction] = useFormState(authAction, {});
  const { Item } = Form;

  return (
    <Form
      name="login_form"
      className="login-form"
      initialValues={{ remember: true }}
      style={{ maxWidth: "300px", margin: "auto", paddingTop: "50px" }}
      onFinish={formAction}
    >
      <Item
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "The input is not valid E-mail!",
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="email" />
      </Item>

      {param === "sign-up" && (
        <Item
          name="username"
          rules={[
            {
              pattern: /^[A-Za-z0-9]+$/,
              message: "no special character allowed",
            },
            { required: true, message: "Please input your Username!" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Item>
      )}
      <Item
        name="password"
        rules={[{ min: 8, message: "at least must be 8 character" }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Item>
      {!isValidCredential(formState) &&
        Object.keys(formState).map((error) => (
          <Item key={error}>
            <Alert
              message={formState[error as keyof UserCredentialErrors]}
              type="error"
              showIcon
            />
          </Item>
        ))}
      <Item style={{ display: "flex", justifyContent: "center" }}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          {param === "sign-up" ? "Sign Up" : "log In"}
        </Button>
      </Item>
      <Item style={{ display: "flex", justifyContent: "center" }}>
        {param === "sign-up" ? (
          <Link href="/log-in">already have account?</Link>
        ) : (
          <Link href="/sign-up">create an account</Link>
        )}
      </Item>
    </Form>
  );
};

export default AuthForm;
