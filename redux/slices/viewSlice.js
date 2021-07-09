import { createSlice } from "@reduxjs/toolkit";

export const viewSlice = createSlice({
  name: "view",
  initialState: {
    listView: true,
    expandView: false,
  },
  reducers: {
    setListView: (state) => {
      state.listView = !state.listView;
    },
    setExpandView: (state) => {
      state.expandView = !state.expandView;
    },
  },
});

export const { setListView, setExpandView } = viewSlice.actions;
export default viewSlice.reducer;
