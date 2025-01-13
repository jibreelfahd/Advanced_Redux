import React from "react";
import { useDispatch } from "react-redux";

import { cartActions } from "../../store/cart";
import styles from "./CartItem.module.css";

const CartItem = ({ id, name, totalPrice, price, quantity }) => {
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
  const removeFromCartHandler = () => {
    dispatch(cartActions.deleteCart({
      id
    }));
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
