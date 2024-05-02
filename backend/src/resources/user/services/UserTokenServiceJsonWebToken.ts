import { sign } from "jsonwebtoken";
import { UserTokenService } from "./UserTokenService";

export default class UserTokenServiceJsonWebToken implements UserTokenService {
  getToken(
    payload: string | object,
    secretOrPrivateKey: string,
    options?: { expiresIn?: string | number | undefined }
  ): string {
    return sign(payload, secretOrPrivateKey, options);
  }
}
