import { createSlice } from "@reduxjs/toolkit";

export const invalidLoginSlice = createSlice({
  name: "invalidLogin",
  initialState: {
    value: false,
  },
  reducers: {
    credsLogin: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value = !state.value;
      console.log("state : store", state.value);
    },
    // backTocredsLogin: (state,action) => {
    //     // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //     // doesn't actually mutate the state because it uses the Immer library,
    //     // which detects changes to a "draft state" and produces a brand new
    //     // immutable state based off those changes.
    //     // Also, no return statement is required from these functions.
    //     state.value = action.payload;
    //     console.log("state : store", state.value);
    //   },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { credsLogin } = invalidLoginSlice.actions;

export default invalidLoginSlice.reducer;
