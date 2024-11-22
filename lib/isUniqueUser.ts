import { sql } from "@vercel/postgres";

async function isUniqueUser(email: string) {
  const user = await sql`SELECT * FROM todousers WHERE email = ${email}`;

  return user.rowCount === 0;
}

export default isUniqueUser;
