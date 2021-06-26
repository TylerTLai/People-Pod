import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import peopleReducer from "./slices/peopleSlice";

export const store = configureStore({
  reducer: {
    modalReducer,
    peopleReducer,
  },
});
