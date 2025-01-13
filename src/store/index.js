import { configureStore } from '@reduxjs/toolkit'

import { showCartReducer } from './show-cart';
import { cartReducer } from './cart';

const store = configureStore({
  reducer: {
    showCart: showCartReducer,
    cartOperations: cartReducer
  }
});

export default store;