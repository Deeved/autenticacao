import { randomUUID } from "node:crypto";
import emailIsvalid from "../utils/emailValidator";
import { createHashPassword } from "../utils/encrypt";

export default class User {
  private constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly created_at: string
  ) {
    if (!name) throw new Error("Name field is required!");
    if ((name as string).length < 3)
      throw new Error("The name field must have at least 3 characters");
    if (!email) throw new Error("Email field is required!");
    if (!emailIsvalid(email)) throw new Error("Invalid email field!");
    if (!password) throw new Error("Password field is required!");
    if ((password as string).length < 6)
      throw new Error("The password field must have at least 6 characters");
  }

  static create(name: string, email: string, password: string): User {
    const userId = randomUUID();
    return new User(
      userId,
      name,
      email,
      createHashPassword(password),
      new Date().toISOString().slice(0, 19).replace(".", " ")
    );
  }

  static restore(
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: string
  ) {
    return new User(id, name, email, password, created_at);
  }
}
