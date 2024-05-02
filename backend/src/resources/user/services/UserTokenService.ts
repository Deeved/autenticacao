type options = {
  expiresIn?: string | number;
};

export interface UserTokenService {
  getToken(
    payload: string | object,
    secretOrPrivateKey: string,
    options?: options | undefined
  ): string;
}
