import { UserRepository } from "./userRepository";
import { User } from "./user";
import { QueryReponse } from "../queryResponse";

export async function listUsers(
  repo: UserRepository
): Promise<QueryReponse<User>> {
  return await repo.list();
}
