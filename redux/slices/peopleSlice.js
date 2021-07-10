import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";

export const filterPeople = createAsyncThunk(
  "people/filterPeople",
  async (searchTerm) => {
    try {
      const res = await axiosInstance.get("people");
      return { people: res.data, searchTerm };
    } catch (error) {
      console.log(error);
    }
  }
);

export const peopleSlice = createSlice({
  name: "people",
  initialState: {
    people: [],
    personId: null,
    searchTerm: "",
    favorite: false,
    loading: true,
    error: "",
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

    favoritePerson: (state, action) => {
      const { personId, favorite } = action.payload;

      state.people = state.people.map((person) =>
        person.personId === personId ? { ...person, favorite } : person
      );
    },
  },
  extraReducers: {
    [filterPeople.fulfilled]: (state, action) => {
      const { people, searchTerm } = action.payload;
      const filteredPeople = people.filter((person) => {
        return (
          person.firstName.toLowerCase().includes(searchTerm) ||
          person.lastName.toLowerCase().includes(searchTerm)
        );
      });
      state.people = filteredPeople;
    },
    [filterPeople.pending]: (state) => {
      state.loading = true;
    },
    [filterPeople.rejected]: (state) => {
      state.error = "error";
    },
  },
});

export const {
  setAllPeople,
  setPersonId,
  addOnePerson,
  favoritePerson,
  updateOnePerson,
} = peopleSlice.actions;
export default peopleSlice.reducer;
