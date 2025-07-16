import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/app/services/api';

// Async thunks
export const getContactForms = createAsyncThunk(
  'contact/getForms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/contact');
      const data = response.data;
      return {
        success: data.success,
        forms: data.data || []
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch contact forms');
    }
  }
);

export const getContactFormById = createAsyncThunk(
  'contact/getFormById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/contact/${id}`);
      const data = response.data;
      return {
        success: data.success,
        form: data.data || null
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch contact form');
    }
  }
);

export const updateContactForm = createAsyncThunk(
  'contact/updateForm',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/contact/${id}`, formData);
      const data = response.data;
      return {
        success: data.success,
        form: data.data || null
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update contact form');
    }
  }
);

export const deleteContactForm = createAsyncThunk(
  'contact/deleteForm',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/contact/delete/${id}`);
      const data = response.data;
      return {
        success: data.success,
        id
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete contact form');
    }
  }
);

export const submitContactForm = createAsyncThunk(
  'contact/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/contact/add', formData);
      const data = response.data;
      return {
        success: data.success,
        form: data.data || null
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit contact form');
    }
  }
);

export const getContactStats = createAsyncThunk(
  'contact/getStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/contact/stats/overview');
      const data = response.data;
      return {
        success: data.success,
        stats: data.data || {}
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch contact statistics');
    }
  }
);

const initialState = {
  forms: [],
  currentForm: null,
  loading: false,
  error: null,
  success: false,
  stats: {}
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearContactState: (state) => {
      state.error = null;
      state.success = false;
    },
    setCurrentForm: (state, action) => {
      state.currentForm = action.payload;
    },
    clearCurrentForm: (state) => {
      state.currentForm = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Contact Forms
      .addCase(getContactForms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContactForms.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = action.payload.forms;
        // Do not set state.success here for GET requests
      })
      .addCase(getContactForms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Contact Form by ID
      .addCase(getContactFormById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContactFormById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentForm = action.payload.form;
        state.success = action.payload.success;
      })
      .addCase(getContactFormById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Contact Form
      .addCase(updateContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContactForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        if (action.payload.form) {
          const index = state.forms.findIndex(form => form.id === action.payload.form.id);
          if (index !== -1) {
            state.forms[index] = action.payload.form;
          }
        }
      })
      .addCase(updateContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Contact Form
      .addCase(deleteContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContactForm.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = state.forms.filter(form => form.id !== action.payload.id);
        state.success = action.payload.success;
      })
      .addCase(deleteContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit Contact Form
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        if (action.payload.form) {
          state.forms.unshift(action.payload.form);
        }
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Get Contact Stats
      .addCase(getContactStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContactStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.success = action.payload.success;
      })
      .addCase(getContactStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearContactState, setCurrentForm, clearCurrentForm } = contactSlice.actions;
export default contactSlice.reducer; 