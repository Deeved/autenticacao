import { ReleaseNotesRepository } from "../../resources/release_notes/database/ReleaseNotesRepository";

export default class ListAllReleaseNotes {
  constructor(private realeseNotesRepo: ReleaseNotesRepository) {}

  async execute(): Promise<any> {
    const outputListAllReleaseNotes =
      await this.realeseNotesRepo.listAllReleaseNotes();
    return outputListAllReleaseNotes;
  }
}
