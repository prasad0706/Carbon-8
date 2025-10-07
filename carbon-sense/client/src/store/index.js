import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import calculationReducer from '../features/calculation/calculationSlice';
import historyReducer from '../features/history/historySlice';
import aiReducer from '../features/ai/aiSlice';
import leaderboardReducer from '../features/leaderboard/leaderboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    calculation: calculationReducer,
    history: historyReducer,
    ai: aiReducer,
    leaderboard: leaderboardReducer,
  },
});

export default store;