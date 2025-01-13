import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { showCartActions } from "../../store/show-cart";
import styles from './CartButton.module.css';

const CartButton = () => {
  const dispatch = useDispatch();

  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch('http://localhost:8080/all-cart');
      const { cart } = await response.json();
      
      cart.map((items) => setTotalQuantity(items.totalQuantity));
    };

    fetchCart();
  }, []);
  
  const toggleCartHandler = () => {
    dispatch(showCartActions.showCartHandler());
  };

  return (
    <button className={styles.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={styles.badge}>{totalQuantity}</span>
    </button>
  )
};

export default CartButton;