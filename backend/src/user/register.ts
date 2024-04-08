import { QueryReponse } from "../queryResponse";
import { User } from "./user";
import { UserRepository } from "./userRepository";

export async function register(
  repo: UserRepository,
  user: User
): Promise<QueryReponse<User>> {
  return await repo.register(user);
}
