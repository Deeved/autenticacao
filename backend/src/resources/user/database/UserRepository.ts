import User from "../../../application/user/User";

export interface UserRepository {
  getUserByEmail(email: string): Promise<User | undefined>;
  saveUser(user: User): Promise<{ id: string }>;
  saveTokenUser(user: User, token: string): Promise<void>;
}
