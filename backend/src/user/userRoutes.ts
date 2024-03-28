import express from "express";
import { Request, Response } from "express";
import { ListUsers } from "./listUsers";
import { UserRepositoryPG } from "./userRepository";
import emailIsvalid from "../utils/emailValidator";

const route = express();

route.get("/users", async (req: Request, res: Response) => {
  const userRepositoryPG = new UserRepositoryPG();
  const response = await ListUsers(userRepositoryPG);

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
export default route;
