"use server";
import UserCredentials from "@/interface/UserCredential";
import isValidCredential from "@/util/auth/isValidCredential";
import validateSignupCredential from "@/util/auth/validateSignup";

export async function signup(
  prevState: UserCredentials,
  formData: UserCredentials
) {
  const errors = validateSignupCredential(formData);

  if (!isValidCredential(errors)) return errors;

  console.log("hello", prevState, formData);
}
