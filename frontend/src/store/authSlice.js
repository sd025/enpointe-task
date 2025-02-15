import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
};

export const loginCustomer = createAsyncThunk(
  'auth/loginCustomer',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/login/customer', credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || err.message
      );
    }
  }
);

export const loginBanker = createAsyncThunk(
  'auth/loginBanker',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/login/banker', credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || err.message
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (registrationData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/register', registrationData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || err.message
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Fallback to the email provided in the login credentials if username is not returned.
        const email = action.meta.arg.email;
        const username = action.payload.username || email || 'Customer';
        state.user = {
          id: action.payload.userId,
          username,
          role: 'customer',
        };
        state.token = action.payload.accessToken;
        localStorage.setItem('token', action.payload.accessToken);
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(loginCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(loginBanker.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginBanker.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const email = action.meta.arg.email;
        const username = action.payload.username || email || 'Banker';
        state.user = {
          id: action.payload.userId,
          username,
          role: 'banker',
        };
        state.token = action.payload.accessToken;
        localStorage.setItem('token', action.payload.accessToken);
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(loginBanker.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const email = action.meta.arg.email;
        const username = action.meta.arg.username || email || 'Customer';
        state.user = {
          id: action.payload.userId,
          username,
          role: 'customer',
        };
        state.token = action.payload.accessToken;
        localStorage.setItem('token', action.payload.accessToken);
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
