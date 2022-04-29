import express, { response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { uid } from "uid";
import { youtube } from "./middleware/youtube.js";
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Array of objects that stores the created rooms.
 * @param rooms.id - Unique ID of the room.
 * @param rooms.ownerName - Specified nickname of the room owner.
 * @param rooms.thumbnailImg - YouTube thumbnail URL of the video that's being watched in the room.
 * @param rooms.roomName - Name of the room, this is `${rooms.ownerName}'s Room` by default(i.e. Yigit's Room if the owner's nickname is  Yigit)
 * @param rooms.participantCount - Number of people who have joined the room.
 * @param rooms.isLocked - True if the room is locked with a custom password, false if not.
 * @param rooms.customPassword - Custom password for the room, empty string if no custom password.
 */
let rooms = [];

/**
 * GET request that sends back the array of created rooms.
 */
app.get("/rooms", (req, res) => res.status(200).send(rooms));

/**
 * POST request that creates a new room in the backend and returns an object that contains an error property and a data object.
 */
app.post("/rooms", (req, res) => {
    const room = {
        data: {
            id: uid(),
            ownerName: req.body.nickname,
            youtubeUrl: req.body.url,
            videoName: null,
            thumbnailImg: "test",
            roomName: req.body.roomName,
            participantCount: 0,
            isLocked: req.body.isLocked,
            customPassword: req.body.customPassword,
        },
        error: null
    };
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const regexMatch = room.data.youtubeUrl.match(youtubeRegex);
    if(!regexMatch) {
        room.error = "Invalid URL.";
        return res.status(200).send(room);
    } else {
        room.data.youtubeUrl = regexMatch[1];
    }
    youtube.videos.list({
        part: "snippet",
        id: room.data.youtubeUrl
    }).then((response) => {
        const parsedData = response.data;
        const totalResults = parsedData.pageInfo.totalResults;
        if(!totalResults) {
            throw new Error("No videos found.");
        } else {
            room.data.videoName = parsedData.items[0].snippet.title;
            room.data.thumbnailImg = parsedData.items[0].snippet.thumbnails.default.url;
            rooms.push(room.data);
        }
    }).catch((err) => {
        room.error = err.message;
        console.error(err.message);
    });
    return res.status(200).send(room);
});

/**
 * GET request that gets the data of a specific room from using its unique ID.
 */
app.get("/rooms/:id", async (req, res) => {
    const id = req.params.id;
    const roomData = await rooms.find(room => room.id === id);
    if(roomData === undefined) return res.send(null);
    return res.send(roomData);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});