import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import dogsReducer from "./slices/dogsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dogs: dogsReducer,
  },
});

export default store;
