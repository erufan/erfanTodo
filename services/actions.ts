"use server";

import User from "@/interface/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import fetchWithToken from "./fetchWithToken";
import authenticateUser from "@/util/authenticateUser";

export async function logIn(user: User) {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data: LogInUser = await response.json();

    if (!response.ok) return { success: false, message: data!.message };

    if (data.accessToken && response.ok) {
      cookies().set("token", data.accessToken, {
        httpOnly: true,
        secure: true,
      });
      cookies().set("token", data.refreshToken!, {
        httpOnly: true,
        secure: true,
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An unknown error occurred. Please try again.",
    };
  }
  redirect("/");
}

export async function deleteToDo(toDoId: number) {
  authenticateUser();
  try {
    const response = await fetchWithToken(
      `https://dummyjson.com/todos/${toDoId}`,
      {
        method: "DELETE",
      }
    );

    if (response.status === 404) {
      console.error("To-Do not found");
      return { success: false, message: "To-Do not found" };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An unknown error occurred. Please try again.",
    };
  }
}

export async function logOut() {
  cookies().delete("token");
  cookies().delete("refreshToken");
}
