import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

import CartItem from "./CartItem";
import Card from "../UI/Card";
import styles from "./Cart.module.css";

const Cart = () => {
  // const addToCart = useSelector(state => state.cartOperations.items);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch('http://localhost:8080/all-cart');
      const { cart } = await response.json();
      setCart(cart)
    };

    fetchCart();
  }, []);
  return (
    <Card className={styles.cart}>
      <h2>Your shopping cart</h2>
      {cart.map((data) => (
        <ul key={data.itemID}>
          <CartItem id={data.itemID} price={data.price} totalPrice={data.totalPrice} name={data.name} quantity={data.quantity} />
        </ul>
      ))}
    </Card>
  );
};

export default Cart;
