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
export const getLeaderboard = createAsyncThunk(
  'leaderboard/getLeaderboard',
  async (period = 'monthly', { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      setAuthToken(auth.userInfo?.token);
      
      const response = await axios.get(`${API_BASE_URL}/leaderboard?period=${period}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserRank = createAsyncThunk(
  'leaderboard/getUserRank',
  async (period = 'monthly', { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      setAuthToken(auth.userInfo?.token);
      
      const response = await axios.get(`${API_BASE_URL}/leaderboard/user-rank?period=${period}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  leaderboard: [],
  userRank: null,
  loading: false,
  error: null,
};

// Leaderboard slice
const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get leaderboard
      .addCase(getLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeaderboard.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.leaderboard = payload;
      })
      .addCase(getLeaderboard.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message;
      })
      // Get user rank
      .addCase(getUserRank.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserRank.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userRank = payload;
      })
      .addCase(getUserRank.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message;
      });
  },
});

export const { clearErrors } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;