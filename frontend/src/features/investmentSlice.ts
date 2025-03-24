import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { InvestmentState, Investment, Fund } from '../types';

// Thunk for fetching all investments
export const fetchInvestments = createAsyncThunk(
  'investments/fetchInvestments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/investments/');
      if (!response.ok) {
        throw new Error('Server Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Thunk for fetching funds for overlap analysis
export const fetchFunds = createAsyncThunk(
  'investments/fetchFunds',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/funds/');
      if (!response.ok) {
        throw new Error('Server Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState: InvestmentState = {
  investments: [],
  funds: [],
  selectedUser: '',
  status: 'idle',
  error: null
};

const investmentSlice = createSlice({
  name: 'investments',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<string>) => {
      state.selectedUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchInvestments states
      .addCase(fetchInvestments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvestments.fulfilled, (state, action: PayloadAction<Investment[]>) => {
        state.status = 'succeeded';
        state.investments = action.payload;
        if (action.payload.length > 0 && !state.selectedUser) {
          state.selectedUser = action.payload[0].user_name;
        }
      })
      .addCase(fetchInvestments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Unknown error occurred';
      })
      
      // Handle fetchFunds states
      .addCase(fetchFunds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFunds.fulfilled, (state, action: PayloadAction<Fund[]>) => {
        state.status = 'succeeded';
        state.funds = action.payload;
      })
      .addCase(fetchFunds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Unknown error occurred';
      });
  }
});

export const { setSelectedUser } = investmentSlice.actions;
export default investmentSlice.reducer;
