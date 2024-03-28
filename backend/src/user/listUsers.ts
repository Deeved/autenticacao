import { IUserRepository, UserRepositoryResponse } from "./IUserRepository";

export async function ListUsers(
  repo: IUserRepository
): Promise<UserRepositoryResponse> {
  return await repo.list();
}
