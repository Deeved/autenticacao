import { UserRepository } from "../../resources/user/userRepository";
import User from "./User";

export class Register {
  constructor(readonly userRepository: UserRepository) {}

  async execute(input: any) {
    const existUser = await this.userRepository.getUserByEmail(input.email);
    if (existUser) throw new Error("User already exist!");
    const user = User.create(input.name, input.email, input.password);
    await this.userRepository.saveUser(user);
  }
}
