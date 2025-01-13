import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    items: [{
      itemID: {
        type: String,
      },
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
      totalPrice: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    }],
    totalQuantity: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Cart = model("cart", cartSchema);
export default Cart;
