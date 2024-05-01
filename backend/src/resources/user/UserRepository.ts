import User from "../../application/user/User";

export interface UserRepository {
  getUserByEmail(email: string): Promise<any | undefined>;
  saveUser(user: User): Promise<{ id: string }>;
}
