"use server";

import Input from "@/interface/Input";
import { revalidateTag } from "next/cache";

async function addToDo(toDo: Input) {
  try {
    const response = await fetch(`${process.env.SITE_URL}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...toDo, userId: 1 }),
    });
    //1 is hard coded should change after implment real auth

    // if (response.status === 401) redirect("/log-in");

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

export default addToDo;
