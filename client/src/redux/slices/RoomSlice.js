import { createSlice } from "@reduxjs/toolkit";

export const RoomSlice = createSlice({
    name: "room",
    initialState: {
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
    }
});

export const { setIsCreatingRoom, setIsUsingPassword } = RoomSlice.actions;
export default RoomSlice.reducer;