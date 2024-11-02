"use client";
import { deleteToDo } from "@/services/actions";
import { Button } from "antd";
import { useState } from "react";

const DeleteButton = ({ toDoid }: { toDoid: number }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const activeClass = {
    marginLeft: 8,
    backgroundColor: "red",
    borderColor: "red",
  };

  const disabledClass = {
    marginLeft: 8,
    backgroundColor: "green",
    borderColor: "green",
    color: "white",
  };

  const handleDelete = async () => {
    try {
      const result = await deleteToDo(toDoid);
      setIsDeleted(true);
      console.log("To-Do deleted successfully:", result);
    } catch (error) {
      console.error("Error deleting To-Do:", error);
    }
  };

  return (
    <Button
      style={isDeleted ? disabledClass : activeClass}
      onClick={handleDelete}
      type="primary"
      disabled={isDeleted}
    >
      {isDeleted ? "Delete was successful" : "Delete"}
    </Button>
  );
};

export default DeleteButton;
