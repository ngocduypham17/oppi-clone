import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  polls: [],
  offset: 0,
  pages: 0,
  selectedID: 0,
};

export const slice = createSlice({
  name: "polllist",
  initialState,
  reducers: {
    setPolls: (state, action) => {
      state.polls = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    setSelectedID: (state, action) => {
      state.selectedID = action.payload;
    },
    getDataAction() {},
    deletePollAction(){},
    logOutAction() {},
  },
});

export const { setSelectedID,setPolls, setOffset, selectedID, setPages,getDataAction,deletePollAction,logOutAction } = slice.actions;

export default slice.reducer;
