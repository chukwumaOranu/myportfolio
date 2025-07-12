import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/app/services/api';

// Async thunks for public project access
export const fetchPublicProjects = createAsyncThunk(
  'projectCase/fetchPublicProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/projects/public');
      const data = response.data;
      return {
        success: data.success,
        projects: data.data || []
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch public projects');
    }
  }
);

const initialState = {
  projects: [],
  loading: false,
  error: null,
  success: false,
};

const projectCaseSlice = createSlice({
  name: 'projectCase',
  initialState,
  reducers: {
    clearProjectCaseState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch public projects
      .addCase(fetchPublicProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.projects;
        state.success = action.payload.success;
      })
      .addCase(fetchPublicProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProjectCaseState } = projectCaseSlice.actions;

// Selectors
export const selectPublicProjects = (state) => state.projectCase.projects;
export const selectPublicProjectLoading = (state) => state.projectCase.loading;
export const selectPublicProjectError = (state) => state.projectCase.error;
export const selectPublicProjectSuccess = (state) => state.projectCase.success;

export default projectCaseSlice.reducer; 