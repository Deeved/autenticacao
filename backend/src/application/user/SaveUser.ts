import { UserRepository } from "../../resources/user/database/UserRepository";
import User from "./User";

export class SaveUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: any) {
    const existUser = await this.userRepository.getUserByEmail(input.email);
    if (existUser) throw new Error("User already exist!");
    const user = User.create(input.name, input.email, input.password);
    const userId = await this.userRepository.saveUser(user);
    return userId;
  }
}
