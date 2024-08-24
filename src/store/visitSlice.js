// src/redux/visitSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk para cargar los conteos de visitas desde la API
export const fetchVisitStats = createAsyncThunk('visits/fetchVisitStats', async () => {
  const response = await axios.get(`https://virtu-back.onrender.com/visits/count`,{ withCredentials: true }); // Asegúrate de que el endpoint sea correcto
  return response.data;
});

const visitSlice = createSlice({
  name: 'visits',
  initialState: {
    pending: 0,
    in_progress: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisitStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVisitStats.fulfilled, (state, action) => {
        state.loading = false;
        state.pending = action.payload.pending;
        state.in_progress = action.payload.in_progress;
      })
      .addCase(fetchVisitStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export default visitSlice.reducer;


