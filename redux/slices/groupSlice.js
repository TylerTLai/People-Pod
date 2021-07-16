import { createSlice } from "@reduxjs/toolkit";

export const groupSlice = createSlice({
  name: "group",
  initialState: {
    groups: [],
    group: "",
    loading: false,
    error: {},
  },
  reducers: {
    setAllGroups: (state, action) => {
      state.groups = action.payload;
    },
    addGroup: (state, action) => {
      state.groups = [...state.groups, ...action.payload];
    },
    updateGroup: (state, action) => {
      const { groupId } = action.payload;
      state.groups = state.groups.map((group) =>
        group.groupId === groupId ? (group = action.payload) : group
      );
    },
  },
});

export const { addGroup, setAllGroups, updateGroup } = groupSlice.actions;
export default groupSlice.reducer;
