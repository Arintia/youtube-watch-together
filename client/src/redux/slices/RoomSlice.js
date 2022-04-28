import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRooms = createAsyncThunk(
    'rooms/fetchRooms',
    async() => {
        const res = await axios("http://localhost:3001/rooms");
        return res.data;
    }
);

export const createRoom = createAsyncThunk(
    'rooms/createRoom',
    async(payload) => {
        const res = await axios.post(`http://localhost:3001/rooms`, payload);
        return res.data;
    }
)

export const RoomSlice = createSlice({
    name: "room",
    initialState: {
        rooms: [],
        isCreatingRoom: false,
        isUsingPassword: false,
        roomCreateError: null
    },
    reducers: {
        setIsCreatingRoom: (state, action) => {
            state.isCreatingRoom = action.payload;
        },
        setIsUsingPassword: (state, action) => {
            state.isUsingPassword = action.payload;
        },
        resetCreateError: (state, action) => {
            state.roomCreateError = null;
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
            } else {
                state.rooms.push(data);
                state.roomCreateError = null;
            }
        }))
    }
});

export const { setIsCreatingRoom, setIsUsingPassword, resetCreateError } = RoomSlice.actions;
export default RoomSlice.reducer;