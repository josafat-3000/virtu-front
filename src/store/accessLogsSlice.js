// accessLogsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Acción asincrónica para obtener los datos
export const fetchAccessLogs = createAsyncThunk('accessLogs/fetchAccessLogs', async () => {
  const response = await axios.get(`https://virtu-back.onrender.com/api/v1/accesslogs`,{ withCredentials: true });  return response.data;
});

const accessLogsSlice = createSlice({
  name: 'accessLogs',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccessLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccessLogs.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchAccessLogs.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default accessLogsSlice.reducer;
