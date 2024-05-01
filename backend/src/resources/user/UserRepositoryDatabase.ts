import { Client } from "pg";
import { UserRepository } from "./UserRepository";
import User from "../../application/user/User";

export class UserRepositoryDatabase implements UserRepository {
  private client!: Client;

  private config = {
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBCLUSTER,
  };

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      this.client = new Client(this.config);
      await this.client.connect();
      const { rows: result } = await this.client.query(
        `SELECT * FROM users WHERE email = '${email}'`
      );
      if (!result[0]) return;
      let user = User.restore(
        result[0].id,
        result[0].name,
        result[0].email,
        result[0].password,
        result[0].created_at
      );
      await this.client.end();
      return user;
    } catch (e) {
      throw new Error("Error when getting user by email");
    } finally {
      await this.client.end();
    }
  }

  async saveUser(user: User): Promise<{ id: string }> {
    try {
      this.client = new Client(this.config);
      await this.client.connect();
      const { rows } = await this.client.query(
        `INSERT INTO users (id, name, email, password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [
          user.id,
          user.name,
          user.email,
          user.password,
          new Date().toISOString().slice(0, 19).replace(".", " "),
        ]
      );
      const userId = rows[0];
      return userId;
    } catch (error) {
      throw new Error("Error when save user");
    } finally {
      await this.client.end();
    }
  }

  async saveTokenUser(user: User, token: string): Promise<void> {
    try {
      this.client = new Client(this.config);
      await this.client.connect();
      const { rows } = await this.client.query(
        `UPDATE users SET token=$1 WHERE id=$2 RETURNING token`,
        [token, user.id]
      );
      if (!rows[0]) throw new Error("Error when save token user");
    } catch (error) {
      throw new Error("Error when save token user");
    } finally {
      await this.client.end();
    }
  }
}
