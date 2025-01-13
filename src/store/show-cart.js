import { createSlice } from "@reduxjs/toolkit";

const initialState = { showCart: false };

const showCartSlice = createSlice({
  name: 'create-slice',
  initialState,
  reducers: {
    showCartHandler (state) {
      state.showCart = !state.showCart
    } 
  }
});

export const showCartActions = showCartSlice.actions;
export const showCartReducer = showCartSlice.reducer;