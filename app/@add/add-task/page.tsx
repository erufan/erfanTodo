"use client";

import { addToDo } from "@/services/actions";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Item } = Form;

const AddTaskPage = () => {
  const [loading, setLoading] = useState(false);
  const [userResponse, setUserResponse] = useState<string | undefined>();
  const router = useRouter();

  const handleOnFinish = async (toDo: { toDo: string }) => {
    setLoading(true);
    const data = await addToDo(toDo);

    data && setLoading(false);

    if (data.message) setUserResponse(data.message);
    else {
      setUserResponse("to-do add successfully 💹");
      setTimeout(() => router.back(), 2000);
    }
  };

  return (
    <dialog
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        justifyContent: "center",
        zIndex: 2,
        alignItems: "center",
      }}
      open
      onClick={router.back}
    >
      <Form
        name="login_form"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleOnFinish}
        style={{
          margin: "auto",
          paddingTop: "50px",
          backgroundColor: " #bababa",
          padding: "2rem",
          borderRadius: "4px",
          border: "none",
          boxShadow: "0 0 10px 0 #181817",
          maxWidth: "50rem",
          width: "100%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Item
          name="toDo"
          rules={[{ required: true, message: "Please input your to-do!" }]}
        >
          <Input placeholder="type to-do ..." />
        </Item>
        <Item style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={loading}
          >
            {loading ? "Sending..." : "Add"}
          </Button>
        </Item>
        {userResponse && userResponse}
      </Form>
    </dialog>
  );
};

export default AddTaskPage;
