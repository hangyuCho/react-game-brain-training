import { createSlice } from "@reduxjs/toolkit";

const hitSlice = createSlice({
  name: "hit",
  initialState: { number: 0 },
  reducers: {
    increase: (state, actions) => {
      state.number += 1
    },
    reset: (state, actions) => {
      state.number = 0
    }
  }
})

export default hitSlice.reducer

export const { increase, reset } = hitSlice.actions
