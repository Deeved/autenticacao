import { ReleaseNotesRepository } from "./ReleaseNotesRepository";
import { Client } from "pg";

export default class ReleaseNotesRepositoryDatabase
  implements ReleaseNotesRepository
{
  private client!: Client;

  private config = {
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBCLUSTER,
  };

  async listAllReleaseNotes(): Promise<any> {
    try {
      this.client = new Client(this.config);
      await this.client.connect();
      const { rows: result } = await this.client.query(
        `SELECT trn.*, tu.name as owner_name
        FROM release_notes trn 
        INNER JOIN users tu ON tu.id = trn.owner_id`
      );
      return result;
    } catch (e) {
      throw new Error("Error when getting release notes");
    } finally {
      this.client.end();
    }
  }
}
