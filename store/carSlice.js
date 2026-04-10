// store/carSlice.js

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cars: []
}

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload
    }
  }
})

export const { setCars } = carSlice.actions
export default carSlice.reducer