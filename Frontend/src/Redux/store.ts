import { configureStore, createSlice } from '@reduxjs/toolkit';
import { addDestination, deleteDestination, initDestinations, initUser, logoutUser, updateDestination } from './reducers';
import { DestinationModel } from '../Models/DestinationModel';
import { UserModel } from '../Models/UserModel';

// Application state: AppState=כלל המידע
export type AppState = {
  destinations: DestinationModel[];
  user: UserModel;
};

// Creating destinations slice:
const destinationSlice = createSlice({
  name: 'destinations', // Internal use
  initialState: null,
  reducers: { initDestinations, addDestination, deleteDestination, updateDestination },
});

// Create user slice:
const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: { initUser, logoutUser },
});

// Creating action creators:
export const destinationActions = destinationSlice.actions;
export const userActions = userSlice.actions;

// Main redux object:
export const store = configureStore<AppState>({
  reducer: {
    destinations: destinationSlice.reducer, // Destination state.
    user: userSlice.reducer, // User state
  },
});
