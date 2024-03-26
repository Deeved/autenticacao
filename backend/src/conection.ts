import { Client } from "pg";

export class ClientPostgres {
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

  async getClient(): Promise<Client | undefined> {
    try {
      await this.client.connect();
      return this.client;
    } catch (error) {
      console.log(`Erro ao conectar com o banco`);
    }
  }
}
