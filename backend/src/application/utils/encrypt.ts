import crypto from "crypto";

export function creatHashPassword(password: string): string {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}
