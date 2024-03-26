import express from "express";
import { Request, Response } from "express";
import { ClientPostgres } from "../conection";

const route = express();

route.get("/users", async (req: Request, res: Response) => {
  const clientPostgres = new ClientPostgres();
  const client = await clientPostgres.getClient();

  try {
    const response = await client?.query("SELECT id, name, email FROM users");
    res.status(200).json({ data: response?.rows });
  } catch (error) {
    res.status(500).send(`Erro ao consultar usuários. ${error}`);
  } finally {
    client?.end(() => console.log("Conexão fechada!"));
  }
});

export default route;
