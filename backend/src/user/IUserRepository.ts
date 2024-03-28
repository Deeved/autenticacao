import { User } from "./user";

export interface UserRepositoryResponse {
  error?: {
    message: string;
    erro: any;
  };
  data?: User[];
}

export interface IUserRepository {
  list(): Promise<UserRepositoryResponse>;
}
