import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/app/services/api';

// Async thunks for public technology access
export const fetchPublicTechnologies = createAsyncThunk(
  'technologyCase/fetchPublicTechnologies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/technologies/public');
      const data = response.data;
      return {
        success: data.success,
        technologies: data.data || []
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch public technologies');
    }
  }
);

const initialState = {
  technologies: [],
  loading: false,
  error: null,
  success: false,
};

const technologyCaseSlice = createSlice({
  name: 'technologyCase',
  initialState,
  reducers: {
    clearTechnologyCaseState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch public technologies
      .addCase(fetchPublicTechnologies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicTechnologies.fulfilled, (state, action) => {
        state.loading = false;
        state.technologies = action.payload.technologies;
        state.success = action.payload.success;
      })
      .addCase(fetchPublicTechnologies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTechnologyCaseState } = technologyCaseSlice.actions;

// Selectors
export const selectPublicTechnologies = (state) => state.technologyCase.technologies;
export const selectPublicTechnologyLoading = (state) => state.technologyCase.loading;
export const selectPublicTechnologyError = (state) => state.technologyCase.error;
export const selectPublicTechnologySuccess = (state) => state.technologyCase.success;

export default technologyCaseSlice.reducer; 