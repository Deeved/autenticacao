import express from "express";
import { Request, Response } from "express";
import ReleaseNotesRepositoryDatabase from "../../resources/release_notes/database/ReleaseNotesRepositoryDatabase";
import ListAllReleaseNotes from "../../application/release_notes/ListAllReleaseNotes";

const route = express();

route.get("/release-notes", async (req: Request, res: Response) => {
  try {
    const releaseNotesRepo = new ReleaseNotesRepositoryDatabase();
    const releaseNotes = await new ListAllReleaseNotes(
      releaseNotesRepo
    ).execute();
    return res.status(200).json({ data: releaseNotes });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
});

export default route;
