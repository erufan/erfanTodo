import { cookies } from "next/headers";

async function refreshAccessToken() {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const response = await fetch("https://dummyjson.com/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (response.ok && data.accessToken) {
      cookies().set("token", data.accessToken, {
        httpOnly: true,
        secure: true,
      });
    }

    return data;
  } catch (error) {
    console.error("Token refresh error:", error);
    return null;
  }
}

export default refreshAccessToken;
