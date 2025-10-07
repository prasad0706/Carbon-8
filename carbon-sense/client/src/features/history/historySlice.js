import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Set auth token for requests
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Async thunks
export const getUserHistory = createAsyncThunk(
  'history/getUserHistory',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      setAuthToken(auth.userInfo?.token);
      
      const response = await axios.get(`${API_BASE_URL}/history`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  calculations: [],
  loading: false,
  error: null,
};

// History slice
const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get user history
      .addCase(getUserHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserHistory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.calculations = payload.calculations || [];
      })
      .addCase(getUserHistory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message;
      });
  },
});

export const { clearErrors } = historySlice.actions;
export default historySlice.reducer;