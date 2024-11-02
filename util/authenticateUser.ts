import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const authenticateUser = () => {
  let token = cookies().get("token");
  // Since i don't have the secret key used for JWT, we're using a simpler approach
  // to authenticate the user by checking if the token exists. This ensures the user
  // is redirected to the login page if they are not authenticated.
  if (!token) redirect("/log-in");

  return token;
};

export default authenticateUser;
