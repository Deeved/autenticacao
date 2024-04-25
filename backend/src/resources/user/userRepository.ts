import { Token, User } from "../../application/user/user";
import { HTTPResponse } from "../../httpResponse";
import { QueryReponse } from "../../queryResponse";

export interface UserRepository {
  list(): Promise<QueryReponse<User>>;

  login(user: User): Promise<HTTPResponse<Token>>;

  register(user: User): Promise<QueryReponse<User>>;
}
