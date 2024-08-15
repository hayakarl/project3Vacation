import { Action, PayloadAction } from '@reduxjs/toolkit';
import { DestinationModel } from '../Models/DestinationModel';
import { UserModel } from '../Models/UserModel';

// npm i react-redux @types/react-redux @reduxjs/toolkit

// Init all destinations
export function initDestinations(currentState: DestinationModel[], action: PayloadAction<DestinationModel[]>) {
  const newState: DestinationModel[] = action.payload; // Here, action.payload is all destinations to init.
  return newState;
}

// Add destination:
//action >> what the data i get. action include payload of data we want to change
export function addDestination(currentState: DestinationModel[], action: PayloadAction<DestinationModel>) {
  const newState: DestinationModel[] = [...currentState];
  newState.push(action.payload); // Here, action.payload is a destination to add.
  return newState;
}

// Delete destination:
export function deleteDestination(currentState: DestinationModel[], action: PayloadAction<DestinationModel>) {
  const newState: DestinationModel[] = [...currentState];
  const indexToDelete = newState.findIndex((p) => p.id === action.payload.id); // -1 if not exist
  if (indexToDelete >= 0) {
    newState.splice(indexToDelete, 1); // Delete
    return newState;
  }
}

// Update destination:
export function updateDestination(currentState: DestinationModel[], action: PayloadAction<DestinationModel>) {
  const newState: DestinationModel[] = [...currentState];
  const indexToUpdate = newState.findIndex((u) => u.id === action.payload.id); //
  if (indexToUpdate >= 0) {
    newState[indexToUpdate] = action.payload;
    return newState;
  }
}

export function initUser(currentState: UserModel, action: PayloadAction<UserModel>) {
  const newState: UserModel = action.payload;
  return newState;
}

export function logoutUser(currentState: UserModel, action: Action) {
  const newState: UserModel = null;
  return newState;
}
