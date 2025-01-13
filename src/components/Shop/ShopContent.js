import React from "react";

import Products from "../Shop/Products";

import styles from "./ShopContent.module.css";

const items = [
  {
    id: "prod1",
    name: "Test",
    description: "This is the first product in this shop",
    price: 6,
  },
  {
    id: "prod2",
    name: "Test2",
    description: "This is the second product in this shop",
    price: 6,
  },
];

const ShopContent = () => {
  return (
    <section className={styles.shop}>
      <h1>BUY YOUR FAVOURITE PRODUCTS</h1>
      {items.map((data) => (
        <ul key={data.id}>
          <Products
            id={data.id}
            name={data.name}
            description={data.description}
            price={data.price}
          />
        </ul>
      ))}
    </section>
  );
};

export default ShopContent;
