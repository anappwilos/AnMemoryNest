import { AIResult } from "../schemas";

export interface AlbumTitleInput {
  existingDetails: string;
}

export interface AIProvider {
  generateAlbumTitle(input: AlbumTitleInput): Promise<AIResult<string>>;
}
