import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { showCartActions } from "../../store/show-cart";
import styles from './CartButton.module.css';

const CartButton = () => {
  const cartTotalQuantity = useSelector(state => state.cartOperations.totalQuantity)
  const dispatch = useDispatch();
  
  const toggleCartHandler = () => {
    dispatch(showCartActions.showCartHandler());
  };

  return (
    <button className={styles.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={styles.badge}>{cartTotalQuantity}</span>
    </button>
  )
};

export default CartButton;