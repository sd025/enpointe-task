import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  transactions: [],
  status: 'idle',
  error: null,
};

export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async (token) => {
  const response = await axios.get('/api/transactions', {
    headers: { Authorization: token },
  });
  return response.data.transactions;
});

export const deposit = createAsyncThunk('transaction/deposit', async ({ token, amount }) => {
  const response = await axios.post('/api/transactions/deposit', { amount }, {
    headers: { Authorization: token },
  });
  return response.data;
});

export const withdraw = createAsyncThunk('transaction/withdraw', async ({ token, amount }) => {
  const response = await axios.post('/api/transactions/withdraw', { amount }, {
    headers: { Authorization: token },
  });
  return response.data;
});

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default transactionSlice.reducer;
