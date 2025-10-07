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
export const createCalculation = createAsyncThunk(
  'calculation/create',
  async (calculationData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      setAuthToken(auth.userInfo?.token);
      
      const response = await axios.post(`${API_BASE_URL}/calculate`, calculationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserCalculations = createAsyncThunk(
  'calculation/getUserCalculations',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      setAuthToken(auth.userInfo?.token);
      
      const response = await axios.get(`${API_BASE_URL}/calculate`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  calculations: [],
  currentCalculation: null,
  loading: false,
  error: null,
};

// Calculation slice
const calculationSlice = createSlice({
  name: 'calculation',
  initialState,
  reducers: {
    clearCurrentCalculation: (state) => {
      state.currentCalculation = null;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create calculation
      .addCase(createCalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCalculation.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentCalculation = payload;
        state.calculations.unshift(payload); // Add to beginning of array
      })
      .addCase(createCalculation.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message;
      })
      // Get user calculations
      .addCase(getUserCalculations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCalculations.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.calculations = payload;
      })
      .addCase(getUserCalculations.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message;
      });
  },
});

export const { clearCurrentCalculation, clearErrors } = calculationSlice.actions;
export default calculationSlice.reducer;