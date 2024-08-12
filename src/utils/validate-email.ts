import * as EmailValidator from "email-validator";

export function isEmailValid(email: string) {
  const emailLength = email.indexOf("@");

  if (emailLength < 3) {
    return false;
  }
  if (
    !EmailValidator.validate(email) ||
    (email.includes("gmail") && email.includes("hotmail") && email.includes("outlook"))
  ) {
    return false;
  }
  return true;
}
