import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/app/services/api';

// Async thunks
export const fetchProfiles = createAsyncThunk(
  'profiles/fetchProfiles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/profiles');
      const data = response.data;
      return {
        success: data.success,
        profiles: data.data || []
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profiles');
    }
  }
);

export const fetchProfileStats = createAsyncThunk(
  'profiles/fetchProfileStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/profiles/stats');
      const data = response.data;
      return {
        success: data.success,
        stats: data.data || {}
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile stats');
    }
  }
);

export const fetchProfileById = createAsyncThunk(
  'profiles/fetchProfileById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/profiles/${id}`);
      const data = response.data;
      return {
        success: data.success,
        profile: data.data || null
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile by ID');
    }
  }
);

export const fetchProfileByUserId = createAsyncThunk(
  'profiles/fetchProfileByUserId',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/profiles/user/${userId}`);
      const data = response.data;
      return {
        success: data.success,
        profile: data.data || null
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile by user ID');
    }
  }
);

export const createProfile = createAsyncThunk(
  'profiles/createProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/profiles/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = response.data;
      return {
        success: data.success,
        profile: data.data || null,
        message: data.message || 'Profile created successfully'
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create profile');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profiles/updateProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const id = formData.get('id');
      const response = await api.put(`/api/profiles/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = response.data;
      return {
        success: data.success,
        profile: data.data || null,
        message: data.message || 'Profile updated successfully'
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

export const deleteProfile = createAsyncThunk(
  'profiles/deleteProfile',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/profiles/${id}`);
      const data = response.data;
      return {
        success: data.success,
        id,
        message: data.message || 'Profile deleted successfully'
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete profile');
    }
  }
);

export const getCountProfiles = createAsyncThunk(
  'profiles/getCountProfiles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/profiles');
      const data = response.data;
      return {
        success: true,
        count: Array.isArray(data.data) ? data.data.length : 0
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to count profiles');
    }
  }
);

const initialState = {
  profiles: [],
  profile: null,
  stats: {},
  loading: false,
  error: null,
  success: false,
  message: null,
  count: 0,
};

const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    clearProfileState: (state) => {
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all profiles
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload.profiles;
        state.success = action.payload.success;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch profile stats
      .addCase(fetchProfileStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.success = action.payload.success;
      })
      .addCase(fetchProfileStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch profile by ID
      .addCase(fetchProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.profile;
        state.success = action.payload.success;
      })
      .addCase(fetchProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch profile by user ID
      .addCase(fetchProfileByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.profile;
        state.success = action.payload.success;
      })
      .addCase(fetchProfileByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create profile
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.profile;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.profile;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Delete profile
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = state.profiles.filter(profile => profile.id !== action.payload.id);
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Get Count Profiles
      .addCase(getCountProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCountProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.count = action.payload.count;
        state.success = action.payload.success;
      })
      .addCase(getCountProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfileState } = profileSlice.actions;

// Selectors
export const selectProfiles = (state) => state.profiles.profiles;
export const selectCurrentProfile = (state) => state.profiles.profile;
export const selectProfileStats = (state) => state.profiles.stats;
export const selectProfileLoading = (state) => state.profiles.loading;
export const selectProfileError = (state) => state.profiles.error;
export const selectProfileSuccess = (state) => state.profiles.success;
export const selectProfileMessage = (state) => state.profiles.message;
export const selectProfileCount = (state) => state.profiles.count;

export default profileSlice.reducer; 