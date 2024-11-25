"use server";

import Input from "@/interface/Input";
import { verifyAuth } from "@/lib/auth";
import { revalidateTag } from "next/cache";

async function addToDo(toDo: Input) {
  const resultVerify = await verifyAuth();

  try {
    const response = await fetch(`${process.env.SITE_URL}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...toDo, userId: resultVerify.user?.id }),
    });

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
