// store/store.js

import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import carReducer from "./carSlice"
import bookingReducer from "./bookingSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carReducer,
    booking: bookingReducer
  }
})