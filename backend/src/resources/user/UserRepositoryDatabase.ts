import { Client } from "pg";
import { UserRepository } from "./userRepository";
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

  constructor() {
    this.client = new Client(this.config);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
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

    return user;
  }

  async saveUser(user: User): Promise<any> {
    try {
      await this.client.connect();

      const result = await this.client.query(
        `INSERT INTO users (id, name, email, password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [
          user.id,
          user.name,
          user.email,
          user.password,
          new Date().toISOString().slice(0, 19).replace(".", " "),
        ]
      );

      console.log(result);

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
