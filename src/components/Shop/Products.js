import React from "react";
import { useDispatch } from "react-redux";

import { cartActions } from "../../store/cart";
import styles from "./Product.module.css";
import Card from "../UI/Card";

const Products = ({ id, name, price, description }) => {
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
  return (
    <Card>
      <li key={id}>
        <div className={styles["product--item"]}>
          <h2>{name}</h2>
          <span>${price.toFixed(2)}</span>
        </div>
        <div className={styles.description}>
          <p>{description}</p>
        </div>
        <div className={styles.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </li>
    </Card>
  );
};

export default Products;
