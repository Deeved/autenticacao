import { Client } from "pg";
import { UserRepository } from "./userRepository";
import { HTTPResponse } from "../httpResponse";
import { Token, User } from "./user";

export class DataPostgres implements UserRepository {
  private client!: Client;

  private config = {
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBCLUSTER,
  };

  constructor() {
    this.client = new Client(this.config);
  }

  async list(): Promise<HTTPResponse<User>> {
    let users = [];
    try {
      await this.client.connect();
      const response = await this.client.query(
        "SELECT id, name, email FROM users"
      );
      users = response.rows;
    } catch (error) {
      return {
        error: { message: "Error when quering users" },
      };
    } finally {
      this.client.end();
    }

    return { data: users };
  }

  async login(user: User): Promise<HTTPResponse<Token>> {
    if (!user.password) {
      return { error: { message: "Password required" } };
    }

    let dataToken = {
      token: "",
    };

    try {
      this.client.connect();
      const query = {
        text: "SELECT * from users WHERE email = $1",
        values: [user.password],
      };
      const response = await this.client.query(query);
      //TODO: implement the rest of the logic
    } catch (error) {
      return { error: { message: "Error when logging in" } };
    }

    return { data: [dataToken] };
  }
}
