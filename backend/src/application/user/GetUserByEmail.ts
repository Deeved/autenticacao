import { UserRepositoryDatabase } from "../../resources/user/UserRepositoryDatabase";
import emailIsvalid from "../utils/emailValidator";
import type User from "./User";

export default class GetUserByEmail {
  constructor(readonly userRepository: UserRepositoryDatabase) {}

  async execute(email: string): Promise<Omit<User, "password"> | undefined> {
    if (!email) throw new Error("Email field is required!");
    if (!emailIsvalid(email)) throw new Error("Invalid email field!");
    const output = await this.userRepository.getUserByEmail(email);
    if (!output) return;
    const user = {
      id: output.id,
      name: output.name,
      email: output.email,
      created_at: output.created_at,
    };
    return user;
  }
}
