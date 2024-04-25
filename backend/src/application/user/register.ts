import { QueryReponse } from "../../queryResponse";
import { UserRepository } from "../../resources/user/userRepository";
import { User } from "./user";

export async function register(
  repo: UserRepository,
  user: User
): Promise<QueryReponse<User>> {
  return await repo.register(user);
}
