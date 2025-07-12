import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/app/services/api';

// Async thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/users');
      const data = response.data;
      return {
        success: data.success,
        users: data.data || []
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const getCountUsers = createAsyncThunk(
  'user/getCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/users');
      const data = response.data;
      return {
        success: true,
        count: Array.isArray(data.data) ? data.data.length : 0
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to count users');
    }
  }
);

export const getProfile = createAsyncThunk(
  'users/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/users/profile');
      const data = response.data;
      return {
        success: data.success,
        profile: data.data || null
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.put('/api/users/update', userData);
      const data = response.data;
      return {
        success: data.success,
        profile: data.data || null
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

export const updatePassword = createAsyncThunk(
  'users/updatePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await api.put('/api/users/password', passwordData);
      const data = response.data;
      return {
        success: data.success,
        message: data.message || 'Password updated successfully'
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update password');
    }
  }
);


export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/users/users/${id}`);
      const data = response.data;
      return {
        success: data.success,
        id
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
    }
  }
);

const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  success: false,
  user: null,
  count: 0,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    clearUserSuccess: (state) => {
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.success = action.payload.success;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
  
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.payload.id);
        state.success = action.payload.success;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Get Count Users
      .addCase(getCountUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCountUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.count = action.payload.count;
        state.success = action.payload.success;
      })
      .addCase(getCountUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearSuccess, clearUserError, clearUserSuccess } = userSlice.actions;
export default userSlice.reducer; 