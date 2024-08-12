import PasswordValidator from "password-validator";
import { isSequential } from ".";

export function isPasswordValid(password: string) {
  const passwordRequirements = new PasswordValidator();
  passwordRequirements.is().min(5);

  if (!passwordRequirements.validate(password) || isSequential(password)) {
    return false;
  }
  return true;
}
