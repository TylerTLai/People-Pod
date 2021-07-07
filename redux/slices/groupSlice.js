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
    addOneGroup: (state, action) => {
      state.group.push(action.payload);
    },
    updateOneGroup: (state, action) => {
      const { groupId } = action.payload;
      state.groups = state.groups.map((group) =>
        group.groupId === groupId ? (group = action.payload) : group
      );
    },
  },
});

export const { addOneGroup, setAllGroups, updateOneGroup } = groupSlice.actions;
export default groupSlice.reducer;
