import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";



const userSlice = createSlice({
    name: "user",
    initialState: {name: 'Adam'},
    reducers: {
        changeName (state, action) {
            state.name = action.payload;
        }
    }
	
});

export const selectUser = (state: RootState) => state.user

export const { changeName } = userSlice.actions;
export const userReducer = userSlice.reducer;