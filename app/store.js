import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../components/shared/Modal/modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});
