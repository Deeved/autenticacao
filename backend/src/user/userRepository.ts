import { HTTPResponse } from "../httpResponse";
import { QueryReponse } from "../queryResponse";
import { Token, User } from "./user";

export interface UserRepository {
  list(): Promise<QueryReponse<User>>;

  login(user: User): Promise<HTTPResponse<Token>>;

  register(user: User): Promise<QueryReponse<User>>;
}
