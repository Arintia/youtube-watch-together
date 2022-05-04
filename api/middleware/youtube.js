import "dotenv/config";
import { google } from "googleapis";
/**
 * Initiliazes YouTube API.
 */
export const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_TOKEN
});