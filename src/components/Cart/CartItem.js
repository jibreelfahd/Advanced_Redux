import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cartActions } from "../../store/cart";
import { deleteCartData } from "../../store/cart-actions";
import styles from "./CartItem.module.css";

const CartItem = ({ id, name, totalPrice, price, quantity }) => {
  const cart = useSelector((state) => state.cartOperations);
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(
      cartActions.addToCart({
        id,
        name,
        price,
      })
    );
  };

  console.log(cart.itemIsOne)

   // @desc: dispatch action to remove an item from the db
   useEffect(() => {
    if (cart.itemIsOne) {
      dispatch(deleteCartData(id));
    }
  }, [cart, id, dispatch]);

  const removeFromCartHandler = () => {
    const timeout = setTimeout(() => {
      dispatch(
        cartActions.deleteCart({
          id,
        })
      );
    }, 500);

    return  () => clearTimeout(timeout);
  };
  return (
    <li className={styles.list}>
      <header>
        <h3>{name}</h3>
        <div className={styles.price}>
          ${totalPrice.toFixed(2)}{" "}
          <span className={styles["item--price"]}>
            (${price.toFixed(2)}/item)
          </span>
        </div>
      </header>
      <div className={styles.details}>
        <div className={styles.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={styles.actions}>
          <button onClick={removeFromCartHandler}>-</button>
          <button onClick={addToCartHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
