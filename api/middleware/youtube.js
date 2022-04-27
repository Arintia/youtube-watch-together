import "dotenv/config";
import { google } from "googleapis";
export const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_TOKEN
});