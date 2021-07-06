import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import peopleReducer from "./slices/peopleSlice";
import groupReducer from "./slices/groupSlice";

export const store = configureStore({
  reducer: {
    groupReducer,
    modalReducer,
    peopleReducer,
  },
});
