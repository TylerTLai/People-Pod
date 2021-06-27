import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    formType: "add",
    formData: {},
  },
  reducers: {
    closeModal: (state) => {
      state.isOpen = false;
    },
    openModal: (state) => {
      state.isOpen = true;
    },
    setFormType: (state, action) => {
      state.formType = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const { closeModal, openModal, setFormData, setFormType } = modalSlice.actions;
export default modalSlice.reducer;
