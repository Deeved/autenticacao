import { Client } from "pg";
import { UserRepository } from "./userRepository";
import { HTTPResponse } from "../httpResponse";
import { User } from "./user";

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
        error: { message: "Error when quering users", erro: error },
      };
    } finally {
      this.client.end();
    }

    return { data: users };
  }
}
