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
        isUsingPassword: false
    },
    reducers: {
        setIsCreatingRoom: (state, action) => {
            state.isCreatingRoom = action.payload;
        },
        setIsUsingPassword: (state, action) => {
            state.isUsingPassword = action.payload;
        }
    },
    extraReducers: (room) => {
        room.addCase(fetchRooms.fulfilled, (state, action) => {
            if(action.payload !== state.rooms) {
                state.rooms = action.payload;
            }
        },
        room.addCase(createRoom.fulfilled, (state, action) => {
            state.rooms.push(action.payload);
        }))
    }
});

export const { setIsCreatingRoom, setIsUsingPassword } = RoomSlice.actions;
export default RoomSlice.reducer;