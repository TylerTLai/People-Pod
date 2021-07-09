import { createSlice } from "@reduxjs/toolkit";

export const peopleSlice = createSlice({
  name: "people",
  initialState: {
    people: [],
    personId: null,
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

    updateOnePerson: (state, action) => {
      const { personId } = action.payload;
      state.people = state.people.map((person) =>
        person.personId === personId ? { ...person, ...action.payload } : person
      );
    },

    setPersonId: (state, action) => {
      state.personId = action.payload;
    },

    resetPersonId: (state) => {
      state.personId = null;
    },

    favoritePerson: (state, action) => {
      const { personId, favorite } = action.payload;

      state.people = state.people.map((person) =>
        person.personId === personId ? { ...person, favorite } : person
      );
    },
  },
});

export const {
  setAllPeople,
  setPersonId,
  resetPersonId,
  addOnePerson,
  favoritePerson,
  updateOnePerson,
} = peopleSlice.actions;
export default peopleSlice.reducer;
