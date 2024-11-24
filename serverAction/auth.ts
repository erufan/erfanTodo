"use server";
import UserCredentials, {
  UserCredentialErrors,
} from "@/interface/UserCredential";
import addUser from "@/lib/addUser";
import { generateSession } from "@/lib/auth";
import isUniqueUser from "@/lib/isUniqueUser";
import isValidCredential from "@/util/auth/isValidCredential";
import validateSignupCredential from "@/util/auth/validateSignup";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function signup(
  prevState: UserCredentialErrors,
  formData: UserCredentials
) {
  const errors = validateSignupCredential(formData);
  if (!(await isUniqueUser(formData.email)))
    errors.email = "This email address is not available";
  if (!isValidCredential(errors)) return errors;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(formData.password, salt);
  formData.password = hashedPassword;

  try {
    const userId: number = await addUser(formData);
    await generateSession(userId.toString());
    redirect("/");
  } catch (error) {
    console.error(error);
    errors.unknown = "something went wrong please try again";
    return errors;
  }
}
