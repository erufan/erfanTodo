import UserCredentials from "@/interface/UserCredential";
import { sql } from "@vercel/postgres";

async function addUser(newUser: UserCredentials) {
  try {
    const user = await sql`INSERT INTO todousers (email,username,password)
      VALUES(${newUser.email},${newUser.username},${newUser.password})
      RETURNING id`;
    return user.rows[0].id;
  } catch (error) {
    throw error;
  }
}

export default addUser;
