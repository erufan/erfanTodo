"use client";

import Input from "@/interface/Input";
import ToDo from "@/interface/ToDo";
import { Form, Input as AntdInput, Button, Checkbox } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
const { Item } = Form;

interface Props<T> {
  serverAction: (formData: Input, toDoID?: number) => Promise<any>;
  defaultValus?: T;
}

const ManageTask = <T extends ToDo>({
  serverAction,
  defaultValus,
}: Props<T>) => {
  const [loading, setLoading] = useState(false);
  const [userResponse, setUserResponse] = useState<string | undefined>();
  const [completed, setCompleted] = useState<boolean>(
    defaultValus?.completed || false
  );
  const router = useRouter();
  let buttonText = defaultValus ? "Edit" : "Add";

  async function handleOnFinish(formData: Input) {
    setLoading(true);

    const data = await serverAction(
      { ...formData, completed },
      defaultValus?.id
    );

    data && setLoading(false);

    if (data.message) setUserResponse(data.message);
    else {
      setUserResponse("The operation was successful 💹");
      setTimeout(() => router.back(), 2000);
    }
  }

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
        initialValues={defaultValus}
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
          name="todo"
          rules={[{ required: true, message: "Please input your to-do!" }]}
        >
          <AntdInput placeholder="type to-do ..." />
        </Item>
        {defaultValus && (
          <Item name="completed">
            <Checkbox
              checked={completed}
              onChange={() => setCompleted((prevCom) => !prevCom)}
            >
              Completed
            </Checkbox>
          </Item>
        )}
        <Item style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={loading}
          >
            {loading ? "Sending..." : buttonText}
          </Button>
        </Item>
        {userResponse && userResponse}
      </Form>
    </dialog>
  );
};

export default ManageTask;
