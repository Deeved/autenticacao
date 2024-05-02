import { UserRepository } from "../../resources/user/database/UserRepository";
import { UserTokenService } from "../../resources/user/services/UserTokenService";
import emailIsvalid from "../utils/emailValidator";
import { compareHashsPassword } from "../utils/encrypt";

export default class Login {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userTokenService: UserTokenService
  ) {}

  async execute(input: {
    email: string;
    password: string;
  }): Promise<{ token: string }> {
    if (!input.email) throw new Error("Email field is required!");
    if (!emailIsvalid(input.email)) throw new Error("Invalid email field!");
    if (!input.password) throw new Error("Password field is required!");
    if ((input.password as string).length < 6)
      throw new Error("The password field must have at least 6 characters");
    const outputGetUser = await this.userRepo.getUserByEmail(input.email);
    if (!outputGetUser) throw new Error("User not found!");
    const isEqualHashPassword = compareHashsPassword(
      input.password,
      outputGetUser.password
    );
    if (!isEqualHashPassword) throw new Error("Invalid password!");
    const secret = process.env.SECRET!;
    const token = this.userTokenService.getToken(
      { id: outputGetUser.id },
      secret
    );
    await this.userRepo.saveTokenUser(outputGetUser, token);
    return { token };
  }
}
