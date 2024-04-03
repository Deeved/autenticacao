import { HTTPResponse } from "../httpResponse";
import { User } from "./user";
import { UserRepository } from "./userRepository";

export async function register(
  repo: UserRepository,
  user: User
): Promise<HTTPResponse<{ message: string }>> {
  return await repo.register(user);
}
