import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Async call for fetching all rooms. Returns an array of rooms.
 */
export const fetchRooms = createAsyncThunk(
    'rooms/fetchRooms',
    async() => {
        const res = await axios("http://localhost:3001/rooms");
        return res.data;
    }
);

/**
 * Async call for creating a room. Returns the object of the room created.
 */
export const createRoom = createAsyncThunk(
    'rooms/createRoom',
    async(payload) => {
        const res = await axios.post(`http://localhost:3001/rooms`, payload);
        return res.data;
    }
);

/**
 * Async call for fetching a room by its ID. Returns the object of the room that was fetched.
 */
export const fetchRoomById = createAsyncThunk(
    'rooms/fetchRoomById',
    async(id) => {
        const res = await axios(`http://localhost:3001/rooms/${id}`);
        return res.data;
    }
);

export const RoomSlice = createSlice({
    name: "room",
    initialState: {
        /**
         * Stores all room objects in an array.
         */
        rooms: [],
        /**
         * Stores whether or not the user is creating a room(only returns true in the component for input)
         */
        isCreatingRoom: false,
        /**
         * Stores whether or not the room user's creating uses a custom password(only useful for input handling whilst making a room)
         */
        isUsingPassword: false,
        /**
         * Any error that was encountered during the room creation process.
         */
        roomCreateError: null,
        /**
         * ID of the room that was created.
         */
        createdRoomId: null,
        /**
         * Data object of the room user's viewing. This includes the room that was created.
         */
        viewingRoomData: {},
        /**
         * Stores whether or not the room was created successfully. Only returns true after the backend API call is complete.
         */
        isRoomCreated: false,
        /**
         * Stores whether or not user is still loading the room.
         */
        isLoadingRoom: true,
        /**
         * Stores whether or not the user successfully loaded a room.
         */
        completedRoomLoad: false
    },
    reducers: {
        /**
         * State modifier for creating a room. Only useful for input handling.
         * @param {*} action - Expects true if user is creating a room and false if not.
         */
        setIsCreatingRoom: (state, action) => {
            state.isCreatingRoom = action.payload;
        },
        /**
         * State modifier for making a room password-protected. Only useful for input handling.
         * @param {*} action - Expects true if the room has a custom password, false if not.
         */
        setIsUsingPassword: (state, action) => {
            state.isUsingPassword = action.payload;
        },
        /**
         * Resets error data encountered whilst creating a room.
         */
        resetCreateError: (state) => {
            state.roomCreateError = null;
        },
        /**
         * Resets all room-related logic. Useful for resetting all states once user leaves the room.
         */
        resetViewingRoom: (state) => {
            state.isCreatingRoom = false;
            state.isUsingPassword = false;
            state.roomCreateError = null;
            state.roomCreateError = null;
            state.createdRoomId = null;
            state.viewingRoomData = {};
            state.isRoomCreated = false;
            state.isLoadingRoom = false;
            state.completedRoomLoad = false;
        }
    },
    extraReducers: (room) => {
        room.addCase(fetchRooms.fulfilled, (state, action) => {
            if(action.payload !== state.rooms) {
                state.rooms = action.payload;
            }
        },
        room.addCase(createRoom.fulfilled, (state, action) => {
            const { data, error } = action.payload;
            if(error !== null) {
                state.roomCreateError = error;
                state.isRoomCreated = false;
            } else {
                state.createdRoomId = data.id;
                state.rooms.push(data);
                state.roomCreateError = null;
                state.isRoomCreated = true;
            }
        }),
        room.addCase(createRoom.pending, (state) => {
            state.isRoomCreated = false;
        }),
        room.addCase(createRoom.rejected, (state) => {
            state.isRoomCreated = false;
        }),
        room.addCase(fetchRoomById.fulfilled, (state, action) => {
            state.viewingRoomData = action.payload;
            state.completedRoomLoad = true;
            state.isLoadingRoom = false;
            state.isCreatingRoom = false;
            state.isRoomCreated = false;
        }),
        room.addCase(fetchRoomById.pending, (state) => {
            state.completedRoomLoad = false;
            state.isLoadingRoom = true;
        }),
        room.addCase(fetchRoomById.rejected, (state) => {
            state.completedRoomLoad = true;
            state.isLoadingRoom = false;
            state.isRoomCreated = false;
            state.roomCreateError = "Error fetching room";
        }));
    }
});

export const { setIsCreatingRoom, setIsUsingPassword, resetCreateError, resetViewingRoom } = RoomSlice.actions;
export default RoomSlice.reducer;