"use server";

import User from "@/interface/user";

export async function logIn(user: User) {
  try {
    const response = await fetch("https://dummyjson.com/auth/loginnn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Login error:", error.message);
      return { success: false, message: error.message };
    } else {
      console.error("Unknown error:", error);
      return {
        success: false,
        message: "An unknown error occurred. Please try again.",
      };
    }
  }
}
