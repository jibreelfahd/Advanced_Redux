import { createSlice } from "@reduxjs/toolkit";

const initialState = { showCart: false, showNotification: null };

const showCartSlice = createSlice({
  name: "create-slice",
  initialState,
  reducers: {
    showCartHandler(state) {
      state.showCart = !state.showCart;
    },
    showNotificationHandler(state, action) {
      state.showNotification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message
      };
    }
  },
});

export const showCartActions = showCartSlice.actions;
export const showCartReducer = showCartSlice.reducer;
