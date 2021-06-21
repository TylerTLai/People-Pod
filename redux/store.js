import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import personReducer from "./slices/personSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    person: personReducer,
  },
});
