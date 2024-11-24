"use server";
import { revalidateTag } from "next/cache";

async function deleteToDo(toDoId: number) {
  try {
    console.log(process.env.SITE_URL);

    const response = await fetch(
      `${process.env.SITE_URL}/api/todos/${toDoId}`,
      {
        method: "DELETE",
      }
    );

    if (response.status === 404) {
      console.error("To-Do not found");
      return { success: false, message: "To-Do not found" };
    }

    const data = await response.json();

    revalidateTag("todos");
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An unknown error occurred. Please try again.",
    };
  }
}

export default deleteToDo;
