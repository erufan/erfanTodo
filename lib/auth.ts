import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { db } from "@vercel/postgres";

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
