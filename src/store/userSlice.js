import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("user/login", async (payload, { dispatch }) => {
    'user/loginUser',
        async (data) => {
            const request = await axios('http://localhost:3000/api/login', data);
        }
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    extraReducers:(builder)=> {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            console.log(action.error.message);
            if(action.error.message === '401 Unauthorized') {
                state.error = 'Credenciales incorrectas';
            }else {
                state.error = action.error.message;
            }
            
        });
});
export default userSlice.reducer;