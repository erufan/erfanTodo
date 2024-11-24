import UserCredentials, {
  UserCredentialErrors,
} from "@/interface/UserCredential";

interface ValidateRules {
  field: keyof UserCredentials;
  validate: (value: string) => boolean;
  message: string;
}

const validateSignupCredential = function (userCredentials: UserCredentials) {
  const errors = {} as UserCredentialErrors;

  const validateRules: ValidateRules[] = [
    {
      field: "email",
      validate: (value) => value.includes("@"),
      message: "pleas enter a valid email",
    },
    {
      field: "username",
      validate: (value) =>
        Boolean(value.match(/^[A-Za-z0-9]+$/) && value.length !== 0),
      message: "pleas enter a valid username",
    },
    {
      field: "password",
      validate: (value) => value.trim().length >= 8,
      message: "pleas enter a valid password",
    },
  ];

  validateRules.forEach((rule) => {
    const credential = userCredentials[rule.field];
    if (!rule.validate(credential!)) errors[rule.field] = rule.message;
  });

  return errors;
};

export default validateSignupCredential;
