import { createSlice } from "@reduxjs/toolkit";

export const groupSlice = createSlice({
  name: "group",
  initialState: {
    groups: [],
    groupId: null,
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
    setGroupId: (state, action) => {
      state.groupId = action.payload;
    },
    updateGroup: (state, action) => {
      const { groupId } = action.payload;
      state.groups = state.groups.map((group) =>
        group.groupId === groupId ? (group = action.payload) : group
      );
    },
  },
});

export const { addGroup, setAllGroups, setGroupId, updateGroup } = groupSlice.actions;
export default groupSlice.reducer;
