import { HTTPResponse } from "../httpResponse";
import { User } from "./user";

export interface UserRepository {
  list(): Promise<HTTPResponse<User>>;
}
