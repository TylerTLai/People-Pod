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

    updateOnePerson: (state, action) => {
      const { favorite, personId } = action.payload;
      state.people = state.people.map((person) =>
        person.personId === personId ? { ...person, ...action.payload } : person
      );
    },

    favoritePerson: (state, action) => {
      const { personId, favorite } = action.payload;

      state.people = state.people.map((person) =>
        person.personId === personId ? { ...person, favorite } : person
      );
    },
  },
});

export const { setAllPeople, addOnePerson, favoritePerson, updateOnePerson } =
  peopleSlice.actions;
export default peopleSlice.reducer;
