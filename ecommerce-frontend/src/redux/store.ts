import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userApi";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    // Add your reducers here
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware), // Add the API middleware
});
