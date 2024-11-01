import { cookies } from "next/headers";

interface FetchOptions {
  headers?: { [key: string]: string };
  method?: string;
  body?: any;
}

async function fetchWithToken(url: string, options: FetchOptions = {}) {
  const token = cookies().get("token")?.value;

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { ...options, headers });
  return response;
}

export default fetchWithToken;
