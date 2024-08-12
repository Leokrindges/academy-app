export function isSequential(password: string) {
  for (let i = 0; i < password.length - 1; i++) {
    if (password.charCodeAt(i) + 1 !== password.charCodeAt(i + 1)) {
      return false;
    }
  }
  return true;
}
