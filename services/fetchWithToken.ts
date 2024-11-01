import { cookies } from "next/headers";
import refreshAccessToken from "./refreshAccessToken";

interface FetchOptions {
  headers?: { [key: string]: string };
  method?: string;
  body?: any;
}

async function fetchWithToken(url: string, options: FetchOptions = {}) {
  let token = cookies().get("token")?.value;

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    const newTokens = await refreshAccessToken();
    if (newTokens && newTokens.accessToken) {
      token = cookies().get("token")?.value;

      const newHeaders = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };

      response = await fetch(url, { ...options, headers: newHeaders });
    }
  }

  return response;
}

export default fetchWithToken;
