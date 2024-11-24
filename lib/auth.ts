import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { db } from "@vercel/postgres";
import { cache } from "react";

const adapter = new NodePostgresAdapter(db, {
  user: "todousers",
  session: "usertodo_session",
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: { secure: process.env.NODE_ENV === "production" },
  },
});

export async function generateSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

export const verifyAuth = cache(async function () {
  const sessionCookie = cookies().get(lucia.sessionCookieName);
  if (!sessionCookie)
    return {
      user: null,
      session: null,
    };

  const sessionId = sessionCookie.value;
  if (!sessionId)
    return {
      user: null,
      session: null,
    };

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}

  return result;
});
