"use server";
import UserCredentials, {
  UserCredentialErrors,
} from "@/interface/UserCredential";
import addUser from "@/lib/addUser";
import { generateSession } from "@/lib/auth";
import existingUser from "@/lib/existingUser";
import isValidCredential from "@/util/auth/isValidCredential";
import validateSignupCredential from "@/util/auth/validateSignup";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function signup(
  prevState: UserCredentialErrors | {},
  formData: UserCredentials
) {
  let redirectPath: string | null = null;
  const errors = validateSignupCredential(formData);
  if (await existingUser(formData.email))
    errors.email = "This email address is not available";
  if (!isValidCredential(errors)) return errors;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(formData.password, salt);
  formData.password = hashedPassword;

  try {
    redirectPath = `/`;
    const userId: number = await addUser(formData);
    await generateSession(userId.toString());
    return {};
  } catch (error) {
    console.error(error);
    errors.unknown = "something went wrong please try again";
    return errors;
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
}

export async function login(
  prevState: UserCredentialErrors | {},
  formData: UserCredentials
) {
  let redirectPath: string | null = null;
  const errors = {} as UserCredentialErrors;
  const user = await existingUser(formData.email);
  if (!user) errors.email = "wrong credential, try agian";
  const isExistingPassword = await bcrypt.compare(
    formData.password,
    user!.password
  );
  if (!isExistingPassword) errors.email = "wrong credential, try agian";
  if (!isValidCredential(errors)) return errors;

  try {
    redirectPath = `/`;
    await generateSession(user!.id.toString());
    return {};
  } catch (error) {
    console.error(error);
    errors.unknown = "something went wrong please try again";
    return errors;
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
}
