import express, { response } from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import { uid } from "uid";
import { youtube } from "./middleware/youtube.js";
import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer(app);
const io = new Server(httpServer, {});

const port = 3001;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * When a socket connects.
 */
io.on('connection', (socket) => {
    console.log('a user connected');
    /**
     * When join event is emitted from client-side. This is used for handling the join logic in the backend after it's emitted
     * from clientside.
     */
    socket.on("join", id => {
        try {
            const roomIndex = rooms.findIndex(room => room.id === id);
            if(roomIndex !== -1) {
                rooms[roomIndex].participantCount++;
            }
        } catch (err) {
            console.error("Couldn't increase participant count");
        }
        console.log("Room ID " + id + " joined");
        socket.join(id);
        socket.to(id).emit("user-joined");
    });
    /**
     * When a socket is disconnecting, the socket leaves the room.
     */
    socket.on("disconnecting", () => {
        const socketIterator = socket.rooms.values();
        const socketID = socketIterator.next().value;
        const roomID = socketIterator.next().value;
        if(roomID) {
            socket.leave(roomID);
            try {
                const roomIndex = rooms.findIndex(room => room.id === roomID);
                if(roomIndex !== -1) {
                    rooms[roomIndex].participantCount--;
                    console.log("Room ID " + roomID + " left");
                    socket.to(roomID).emit("user-left");
                }
            } catch (err) {
                console.error(err.message);
            }
        }
    });
    socket.on("disconnect", () => {
        console.log("a user disconnected");
    })
});



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
    /**
     * Regex to see if link is a valid YouTube URL.
     */
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    /**
     * Regex match call to check if link is a valid YouTube url.
     */
    const regexMatch = room.data.youtubeUrl.match(youtubeRegex);
    if(!regexMatch) {
        room.error = "Invalid URL.";
        return res.status(200).send(room);
    } else {
        room.data.youtubeUrl = regexMatch[1];
    }
    /**
     * YouTube API call to fetch the video from the URL. 
     */
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

httpServer.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});