import { configureStore } from "@reduxjs/toolkit";
import groupReducer from "./slices/groupSlice";
import modalReducer from "./slices/modalSlice";
import peopleReducer from "./slices/peopleSlice";
import viewReducer from "./slices/viewSlice";

export const store = configureStore({
  reducer: {
    groupReducer,
    modalReducer,
    peopleReducer,
    viewReducer,
  },
});
