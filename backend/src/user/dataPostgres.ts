import { Client } from "pg";
import { UserRepository } from "./userRepository";
import { HTTPResponse } from "../httpResponse";
import { Token, User } from "./user";
import { QueryReponse } from "../queryResponse";

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

  async list(): Promise<QueryReponse<User>> {
    let users: User[] = [];
    try {
      await this.client.connect();
      const response = await this.client.query(
        "SELECT id, name, email FROM users"
      );
      users = response.rows;
    } catch (error) {
      return {
        success: false,
        message: "Error when quering users",
      };
    } finally {
      this.client.end();
    }

    return { success: true, data: users };
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
    } finally {
      this.client.end();
    }

    return { data: [dataToken] };
  }

  async register(user: User): Promise<QueryReponse<User>> {
    try {
      await this.client.connect();

      const { rows } = await this.client.query(
        `SELECT email FROM users WHERE email = '${user.email}'`
      );

      if (rows[0]) {
        return { success: false, message: "Email already exists" };
      }

      const result = await this.client.query(
        `INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, $4) RETURNING *`,
        [
          user.name,
          user.email,
          user.password!,
          new Date().toISOString().slice(0, 19).replace(".", " "),
        ]
      );

      if (!result.rows[0].id) {
        return { success: false, message: "Error registering user" };
      }

      return { success: true };
    } catch (error) {
      return { success: false, message: "Error registering user" };
    } finally {
      this.client.end();
    }
  }
}
