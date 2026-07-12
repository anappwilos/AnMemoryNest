import { z } from "zod";

export const AlbumTitleSchema = z.string().min(1).max(100);
