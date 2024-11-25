import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { db } from "@vercel/postgres";
import { NextRequest } from "next/server";

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

export const verifyAuth = async function () {
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
};

export const verifyApiAuth = async function (req: NextRequest) {
  const authorizationHeader = req.headers.get("Authorization");
  const sessionId = lucia.readBearerToken(authorizationHeader ?? "");
  if (!sessionId)
    return {
      user: null,
      session: null,
    };

  const result = await lucia.validateSession(sessionId);
  if (!result.user || !result.session)
    return {
      user: null,
      session: null,
    };

  return result;
};

export const destroySession = async function () {
  const { session } = await verifyAuth();
  if (!session) throw new Error("not allowed");

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};
