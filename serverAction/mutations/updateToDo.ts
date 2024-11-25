"use server";

import Input from "@/interface/Input";
import { verifyAuth } from "@/lib/auth";
import revalidateTags from "@/util/revalidateTags";

async function updateToDo(toDo: Input, toDoId?: number) {
  try {
    const resultVerify = await verifyAuth();
    const response = await fetch(
      `${process.env.SITE_URL}/api/protectedApi/todo-mutation/${toDoId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resultVerify.session?.id}`,
        },
        body: JSON.stringify(toDo),
      }
    );

    const data = await response.json();

    revalidateTags([toDoId!.toString(), "todos"]);
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An unknown error occurred. Please try again.",
    };
  }
}

export default updateToDo;
