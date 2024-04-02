import { HTTPResponse } from "../httpResponse";
import { UserRepository } from "./userRepository";
import { User } from "./user";

export async function listUsers(
  repo: UserRepository
): Promise<HTTPResponse<User>> {
  return await repo.list();
}
