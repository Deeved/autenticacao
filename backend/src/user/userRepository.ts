import { HTTPResponse } from "../httpResponse";
import { Token, User } from "./user";

export interface UserRepository {
  list(): Promise<HTTPResponse<User>>;

  login(user: User): Promise<HTTPResponse<Token>>;
}
