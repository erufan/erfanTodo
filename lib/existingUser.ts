import User from "@/interface/User";
import { sql } from "@vercel/postgres";

async function existingUser(email: string) {
  const user = await sql`SELECT * FROM todousers WHERE email = ${email}`;

  return user.rows[0] as User | undefined;
}

export default existingUser;
