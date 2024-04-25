import { QueryReponse } from "../../queryResponse";
import { UserRepository } from "../../resources/user/userRepository";
import { User } from "./user";

export async function listUsers(
  repo: UserRepository
): Promise<QueryReponse<User>> {
  return await repo.list();
}
