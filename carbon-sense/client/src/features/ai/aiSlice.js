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
export const getAISuggestions = createAsyncThunk(
  'ai/getAISuggestions',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      setAuthToken(auth.userInfo?.token);
      
      const response = await axios.get(`${API_BASE_URL}/ai/suggestions`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserAISuggestions = createAsyncThunk(
  'ai/getUserAISuggestions',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      setAuthToken(auth.userInfo?.token);
      
      const response = await axios.get(`${API_BASE_URL}/ai/history`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  suggestions: [],
  currentSuggestion: null,
  loading: false,
  error: null,
};

// AI slice
const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    clearCurrentSuggestion: (state) => {
      state.currentSuggestion = null;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get AI suggestions
      .addCase(getAISuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAISuggestions.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentSuggestion = payload.suggestion;
      })
      .addCase(getAISuggestions.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message;
      })
      // Get user AI suggestions history
      .addCase(getUserAISuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAISuggestions.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.suggestions = payload;
      })
      .addCase(getUserAISuggestions.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message;
      });
  },
});

export const { clearCurrentSuggestion, clearErrors } = aiSlice.actions;
export default aiSlice.reducer;