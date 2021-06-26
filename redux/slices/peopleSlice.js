import { createSlice } from "@reduxjs/toolkit";

export const peopleSlice = createSlice({
  name: "people",
  initialState: {
    people: [],
    person: null,
    favorite: false,
    searchQuery: "",
    loading: true,
    error: {},
  },
  reducers: {
    setAllPeople: (state, action) => {
      state.people = action.payload;
    },
    addOnePerson: (state, action) => {
      state.people.push(action.payload);
    },
  },
});

export const { setAllPeople, addOnePerson } = peopleSlice.actions;
export default peopleSlice.reducer;
