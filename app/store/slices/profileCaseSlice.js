import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/app/services/api';

// Async thunks for public profile access
export const fetchPublicProfiles = createAsyncThunk(
  'profileCase/fetchPublicProfiles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/profiles/public');
      const data = response.data;
      return {
        success: data.success,
        profiles: data.data || []
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch public profiles');
    }
  }
);

// Fetch main profile for public display
export const fetchPublicProfile = createAsyncThunk(
  'profileCase/fetchPublicProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/profiles/public/main');
      const data = response.data;
      return {
        success: data.success,
        profile: data.data || null
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch public profile');
    }
  }
);

const initialState = {
  profiles: [],
  profile: null,
  loading: false,
  error: null,
  success: false,
};

const profileCaseSlice = createSlice({
  name: 'profileCase',
  initialState,
  reducers: {
    clearProfileCaseState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch public profiles
      .addCase(fetchPublicProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload.profiles;
        state.success = action.payload.success;
      })
      .addCase(fetchPublicProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch public profile (main)
      .addCase(fetchPublicProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.profile;
        state.success = action.payload.success;
      })
      .addCase(fetchPublicProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfileCaseState } = profileCaseSlice.actions;

// Selectors
export const selectPublicProfiles = (state) => state.profileCase.profiles;
export const selectPublicProfile = (state) => state.profileCase.profile;
export const selectPublicProfileLoading = (state) => state.profileCase.loading;
export const selectPublicProfileError = (state) => state.profileCase.error;
export const selectPublicProfileSuccess = (state) => state.profileCase.success;

export default profileCaseSlice.reducer; 