import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "./slices/groupSlice";
import modalReducer from "./slices/modalSlice";
import peopleReducer from "./slices/peopleSlice";
import viewReducer from "./slices/viewSlice";

export const store = configureStore({
  reducer: {
    groupsReducer,
    modalReducer,
    peopleReducer,
    viewReducer,
  },
});
