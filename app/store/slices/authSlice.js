import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/app/services/api';

// Helper to get user from localStorage (optional, for persistence on refresh)
const getStoredUser = () => {
  if (typeof window !== 'undefined') {
    try {
      const user = localStorage.getItem('user');
      if (!user || user.trim() === '') {
        localStorage.removeItem('user');
        return null;
      }
      return JSON.parse(user);
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  }
  return null;
};

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
      return data.data;  // 👈 Fix here
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
      // Clear localStorage immediately
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('tokenExpiry');
      }

      // Try to call the logout API
      const response = await api.post('/api/users/logout');
      const data = response.data;

      if (!data.success) {
        return rejectWithValue('Logout failed');
      }

      // Backend clears HttpOnly cookie automatically
      return true;
    } catch (error) {
      // Even if API call fails, we still want to clear local state
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('tokenExpiry');
      }
      
      const errorMessage = error.response?.data?.message || error.message || 'Logout failed.';
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  user: getStoredUser(),
  isAuthenticated: !!getStoredUser(),
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
        console.log('Login fulfilled - payload:', action.payload);
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user || action.payload;

        console.log('Login fulfilled - updated state:', {
          isAuthenticated: state.isAuthenticated,
          user: state.user
        });

        // Persist user to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(action.payload.user || action.payload));
          console.log('User saved to localStorage');
        }
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

        // Persist user to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(action.payload.user || action.payload));
        }
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

        if (typeof window !== 'undefined') {
          localStorage.removeItem('user');
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Clear user state even if logout API fails
        state.isAuthenticated = false;
        state.user = null;

        if (typeof window !== 'undefined') {
          localStorage.removeItem('user');
          localStorage.removeItem('tokenExpiry');
        }
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
