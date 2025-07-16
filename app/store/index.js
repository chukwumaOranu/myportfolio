import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import contactReducer from './slices/contactSlice';
import profileReducer from './slices/profileSlice';
import profileCaseReducer from './slices/profileCaseSlice';
import projectReducer from './slices/projectSlice';
import projectCaseReducer from './slices/projectCaseSlice';
import technologyReducer from './slices/technologySlice';
import technologyCaseReducer from './slices/technologyCaseSlice';

// Create a custom storage engine that works in both client and server environments
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' 
  ? require('redux-persist/lib/storage').default
  : createNoopStorage();

// Configure persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth','users','profiles','contact','profileCase','projects','projectCase','technology','technologyCase'] // only these reducerswill be persisted
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  contacts: contactReducer,
  profiles: profileReducer,
  profileCase: profileCaseReducer,
  projects: projectReducer,
  projectCase: projectCaseReducer,
  technology: technologyReducer,
  technologyCase: technologyCaseReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export default store; 