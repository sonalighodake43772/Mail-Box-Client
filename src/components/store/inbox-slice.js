import { createSlice } from "@reduxjs/toolkit";

const inboxStore = {
  inbox: [],
  sentbox: [],
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState: inboxStore,
  reducers: {
    inboxHandler(currState, action) {
      currState.inbox = action.payload.newArray;
    },

    sentHandler(currState, action) {
      currState.sentbox = action.payload.newArray2;
     },

   

     
  },
});

export const inboxActions = inboxSlice.actions;
export default inboxSlice.reducer;