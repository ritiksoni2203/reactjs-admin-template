// ** Redux Imports
import navbar from "./navbar";
import layout from "./layout";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import authReducer from "./auth/slice";
import workoutReducer from "./workouts/slice"

const rootReducer = {
  navbar,
  layout,
  auth: authReducer,
  workout: workoutReducer
};

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
});

export default configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware
});
