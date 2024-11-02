"use server";

import User from "@/interface/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import fetchWithToken from "./fetchWithToken";
import { jwtDecode } from "jwt-decode";

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

export async function addToDo(toDo: { toDo: string }) {
  let token = cookies().get("token");
  if (!token) redirect("/log-in");

  const { id }: { id: number } = jwtDecode(token.value);

  try {
    const response = await fetchWithToken("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...toDo, userId: id }),
    });

    if (response.status === 401) redirect("/log-in");

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

export async function updateToDo(toDo: { toDo: string }, toDoId?: number) {
  let token = cookies().get("token");
  if (!token) redirect("/log-in");

  try {
    const response = await fetchWithToken(
      `https://dummyjson.com/todos/${toDoId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toDo),
      }
    );

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

export async function deleteToDo(toDoId?: number) {
  let token = cookies().get("token");
  if (!token) redirect("/log-in");

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
