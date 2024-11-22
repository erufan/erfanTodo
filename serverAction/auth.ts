"use server";
import UserCredentials from "@/interface/UserCredential";
import isUniqueUser from "@/lib/isUniqueUser";
import isValidCredential from "@/util/auth/isValidCredential";
import validateSignupCredential from "@/util/auth/validateSignup";

export async function signup(
  prevState: UserCredentials,
  formData: UserCredentials
) {
  const errors = validateSignupCredential(formData);
  if (!(await isUniqueUser(formData.email)))
    errors.email = "This email address is not available";
  if (!isValidCredential(errors)) return errors;

  //hash password
  //store user in data base
  //have a good day or night

  return {};
}
