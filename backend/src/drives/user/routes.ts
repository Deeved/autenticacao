import express from "express";
import { Request, Response } from "express";
import { DataPostgres } from "../../resources/user/dataPostgres";
import emailIsvalid from "../../application/utils/emailValidator";
import { creatHashPassword } from "../../application/utils/encrypt";
import { listUsers } from "../../application/user/listUsers";
import { User } from "../../application/user/user";
import { register } from "../../application/user/register";

const route = express();

route.get("/users", async (req: Request, res: Response) => {
  const userRepositoryPG = new DataPostgres();
  const { success, data, message } = await listUsers(userRepositoryPG);

  if (!success) {
    res.status(500).json({ success, error: message });
  }

  res.status(200).send({ success: true, data });
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
    password: creatHashPassword(password),
  };

  const dbpg = new DataPostgres();
  const { success, message } = await register(dbpg, newUser);

  if (!success) {
    return res.status(500).json({ success, message });
  }

  res.status(200).json({ success, message: "User registered successfully" });
});

export default route;
