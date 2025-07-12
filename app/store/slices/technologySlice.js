import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/app/services/api';

// Async thunks
export const fetchTechnologies = createAsyncThunk(
  'technology/fetchTechnologies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/technologies');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch technologies');
    }
  }
);

export const createTechnology = createAsyncThunk(
  'technology/createTechnology',
  async (technologyData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/technologies/create', technologyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create technology');
    }
  }
);

export const updateTechnology = createAsyncThunk(
  'technology/updateTechnology',
  async ({ id, technologyData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/technologies/update/${id}`, technologyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update technology');
    }
  }
);

export const deleteTechnology = createAsyncThunk(
  'technology/deleteTechnology',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/technologies/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete technology');
    }
  }
);

export const fetchTechnologyById = createAsyncThunk(
  'technology/fetchTechnologyById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/technologies/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch technology');
    }
  }
);

export const fetchProjectTechnologies = createAsyncThunk(
  'technology/fetchProjectTechnologies',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/technologies/project/${projectId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch project technologies');
    }
  }
);

const initialState = {
  technologies: [],
  currentTechnology: null,
  projectTechnologies: [],
  loading: false,
  error: null,
  success: false,
  message: ''
};

const technologySlice = createSlice({
  name: 'technology',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
      state.message = '';
    },
    clearProjectTechnologies: (state) => {
      state.projectTechnologies = [];
    },
    clearCurrentTechnology: (state) => {
      state.currentTechnology = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch technologies
      .addCase(fetchTechnologies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTechnologies.fulfilled, (state, action) => {
        state.loading = false;
        state.technologies = action.payload.data;
      })
      .addCase(fetchTechnologies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create technology
      .addCase(createTechnology.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTechnology.fulfilled, (state, action) => {
        state.loading = false;
        state.technologies.push(action.payload.data);
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(createTechnology.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update technology
      .addCase(updateTechnology.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTechnology.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.technologies.findIndex(tech => tech.id === action.payload.data.id);
        if (index !== -1) {
          state.technologies[index] = action.payload.data;
        }
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(updateTechnology.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete technology
      .addCase(deleteTechnology.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTechnology.fulfilled, (state, action) => {
        state.loading = false;
        state.technologies = state.technologies.filter(tech => tech.id !== action.payload);
        state.success = true;
        state.message = 'Technology deleted successfully';
      })
      .addCase(deleteTechnology.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch project technologies
      .addCase(fetchProjectTechnologies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectTechnologies.fulfilled, (state, action) => {
        state.loading = false;
        state.projectTechnologies = action.payload.data;
      })
      .addCase(fetchProjectTechnologies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch technology by ID
      .addCase(fetchTechnologyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTechnologyById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTechnology = action.payload.data;
      })
      .addCase(fetchTechnologyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearSuccess, clearProjectTechnologies, clearCurrentTechnology } = technologySlice.actions;

// Selectors
export const selectTechnologies = (state) => state.technology.technologies;
export const selectCurrentTechnology = (state) => state.technology.currentTechnology;
export const selectProjectTechnologies = (state) => state.technology.projectTechnologies;
export const selectTechnologyLoading = (state) => state.technology.loading;
export const selectTechnologyError = (state) => state.technology.error;
export const selectTechnologySuccess = (state) => state.technology.success;
export const selectTechnologyMessage = (state) => state.technology.message;

export default technologySlice.reducer; 