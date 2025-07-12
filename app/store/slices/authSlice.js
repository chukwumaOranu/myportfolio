import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/app/services/api';

// Async thunk to login user
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/users/login', {
        username: credentials.username,
        password: credentials.password,
      });

      const data = response.data;

      if (!data.success || !data.data?.user) {
        return rejectWithValue(data.message || 'Login failed');
      }

      // Return both user and redirect
      return data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/users/register', {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      });

      const data = response.data;

      if (!data.success) {
        return rejectWithValue(data.message || 'Registration failed');
      }

      // Return the registered user data
      return data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to logout user
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Try to call the logout API
      const response = await api.post('/api/users/logout');
      const data = response.data;

      if (!data.success) {
        return rejectWithValue('Logout failed');
      }

      // Backend clears HttpOnly cookie automatically
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Logout failed.';
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user || action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user || action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Clear user state even if logout API fails
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
