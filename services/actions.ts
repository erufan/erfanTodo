"use server";

import { cookies } from "next/headers";

export async function logOut() {
  cookies().delete("token");
  cookies().delete("refreshToken");
}
