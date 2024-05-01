import crypto from "crypto";

export function createHashPassword(password: string): string {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

export function compareHashsPassword(password: string, hash: string): boolean {
  const newHash = createHashPassword(password);
  return newHash === hash;
}
