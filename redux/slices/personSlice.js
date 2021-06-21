import { createSlice } from "@reduxjs/toolkit";

export const personSlice = createSlice({
  name: "person",
  initialState: {
    people: [
      {
        firstName: "",
        lastName: "",
        quickNote: "",
      },
    ],
  },
  reducers: {
    addPerson: (state, action) => {
      state.people.push(action.payload);
    },
  },
});

export const { addPerson } = personSlice.actions;
export default personSlice.reducer;
