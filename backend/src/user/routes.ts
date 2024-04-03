import express from "express";
import { Request, Response } from "express";
import { listUsers } from "./listUsers";
import { DataPostgres } from "./dataPostgres";
import emailIsvalid from "../utils/emailValidator";
import { register } from "./register";
import { User } from "./user";

const route = express();

route.get("/users", async (req: Request, res: Response) => {
  const userRepositoryPG = new DataPostgres();
  const response = await listUsers(userRepositoryPG);

  if (response.error) {
    res.status(500).json({ error: response.error.message });
  }

  res.status(200).send(response.data);
});

route.get("/user/:email", (req: Request, res: Response) => {
  const { email } = req.params;

  const emailValid = emailIsvalid(email);

  if (!emailValid) {
    res.status(500).send({ message: `Email invalid` });
  }
});

route.post("/user", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ error: { message: "Name field is required!" } });
  }

  if ((name as string).length < 3) {
    return res.status(400).json({
      error: { message: "The name field must have at least 3 characters" },
    });
  }

  if (!email) {
    return res
      .status(400)
      .json({ error: { message: "Email field is required!" } });
  }

  if (!emailIsvalid(email)) {
    return res.status(400).json({ error: { message: "Invalid email field!" } });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: { message: "password field is required!" } });
  }

  if ((password as string).length < 6) {
    return res.status(400).json({
      error: { message: "The password field must have at least 6 characters" },
    });
  }

  const newUser: User = {
    name,
    email,
    password,
  };

  const dbpg = new DataPostgres();
  const response = await register(dbpg, newUser);

  if (response.error) {
    return res.status(500).json(response);
  }

  res.status(200).json(response);
});

export default route;
