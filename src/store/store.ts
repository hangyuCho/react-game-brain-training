import { configureStore } from "@reduxjs/toolkit"
import hitReducer from "./hitReducer"

const store = configureStore({
  reducer: {
    hit: hitReducer
  }
})

export default store
