import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], totalQuantity: 0 };

const cartSlice = createSlice({
  name: "add-to-cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      console.log(action.payload)
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addToCart(state, action) {
      const newItems = action.payload;
      const existingItems = state.items.find(
        (item) => item.itemID === newItems.id
      );
      state.totalQuantity++;

      if (!existingItems) {
        state.items.push({
          itemID: newItems.id,
          name: newItems.name,
          price: newItems.price,
          totalPrice: newItems.price,
          quantity: 1,
        });
      } else {
        existingItems.quantity++;
        existingItems.totalPrice = existingItems.totalPrice + newItems.price;
      }

    },
    deleteCart(state, action) {
      const cartItem = action.payload;
      const itemExist = state.items.find((item) => item.itemID === cartItem.id);
      state.totalQuantity--;

      if (itemExist.quantity === 1) {
        state.items = state.items.filter((item) => item.itemID !== cartItem.id);
      } else {
        itemExist.totalPrice = itemExist.totalPrice - itemExist.price;
        itemExist.quantity--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
