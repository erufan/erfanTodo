import { UserCredentialErrors } from "@/interface/UserCredential";

const isValidCredential = function (errors: UserCredentialErrors | {}) {
  return Object.keys(errors).length === 0;
};

export default isValidCredential;
