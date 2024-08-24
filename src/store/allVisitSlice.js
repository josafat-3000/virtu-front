import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllVisits = createAsyncThunk('visits/fetchAllVisits', async () => {
    const response = await axios.get(`https://virtu-back.onrender.com/visits`,{ withCredentials: true }); // Asegúrate de que el endpoint sea correcto
    return response.data;
  });

  const allVisitSlice = createSlice({
    name: 'allVisits',
    initialState: {
      visitas: [],
      loadingVisits: false,
      errorVisits: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllVisits.pending, (state) => {
          state.loadingVisits = true;
          state.errorVisits = null;
        })
        .addCase(fetchAllVisits.fulfilled, (state, action) => {
          state.loadingVisits = false;
          state.visitas = action.payload;
        })
        .addCase(fetchAllVisits.rejected, (state, action) => {
          state.loadingVisits = false;
          state.errorVisits = action.error.message;
        });
    },
  });
  export default allVisitSlice.reducer;  