import AddToDo from "@/components/AddToDo";
import { addToDo } from "@/services/actions";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Item } = Form;

const AddTaskPage = () => {
  return <AddToDo serverAction={addToDo} />;
};

export default AddTaskPage;
