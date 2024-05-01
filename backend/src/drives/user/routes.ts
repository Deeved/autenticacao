import express from "express";
import { Request, Response } from "express";
import { UserRepositoryDatabase } from "../../resources/user/UserRepositoryDatabase";
import GetUserByEmail from "../../application/user/GetUserByEmail";
import { SaveUser } from "../../application/user/SaveUser";
import Login from "../../application/user/Login";

const route = express();

route.get("/users/:email", async (req: Request, res: Response) => {
  try {
    const userRepo = new UserRepositoryDatabase();
    const user = await new GetUserByEmail(userRepo).execute(req.params.email);
    return res.status(200).json({ user });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
});

route.post("/users", async (req: Request, res: Response) => {
  try {
    const userRepo = new UserRepositoryDatabase();
    const userId = await new SaveUser(userRepo).execute(req.body);
    res.status(201).json(userId);
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
});

route.post("/login", async (req: Request, res: Response) => {
  try {
    const userRepo = new UserRepositoryDatabase();
    const output = await new Login(userRepo).execute(req.body);
    res.status(200).json(output);
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
});

export default route;
