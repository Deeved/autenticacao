import express from "express";
import { Request, Response } from "express";
import { UserRepositoryDatabase } from "../../resources/user/UserRepositoryDatabase";
import GetUserByEmail from "../../application/user/GetUserByEmail";

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

// route.post("/users", async (req: Request, res: Response) => {
//   const { name, email, password } = req.body;
//   const user = User.create(name, email, password);
//   const dbpg = new RepositoryDatabase();
//   const { success, message } = await register(dbpg, user);

//   if (!success) {
//     return res.status(500).json({ success, message });
//   }

//   res.status(200).json({ success, message: "User registered successfully" });
// });

export default route;
