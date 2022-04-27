import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { uid } from "uid";

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
 * POST request that creates a new room in the backend and returns the new room.
 */
app.post("/rooms", (req, res) => {
    const room = {
        id: uid(),
        ownerName: req.body.nickname,
        thumbnailImg: "test",
        roomName: req.body.roomName,
        participantCount: 0,
        isLocked: req.body.isLocked,
        customPassword: req.body.customPassword,
    };
    rooms.push(room);
    return res.status(200).send(room);
});

/**
 * DELETE request that deletes a specific room from the created rooms and returns its unique ID.
 */
app.delete("/rooms/:id", (req, res) => {
    const id = req.params.id;
    rooms = rooms.filter(room => id !== room.id);
    return res.send(id);
});

/**
 * DELETE request that deletes all rooms.
 */
app.delete("/rooms", (req, res) => {
    rooms = [];
    return res.send(rooms);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});