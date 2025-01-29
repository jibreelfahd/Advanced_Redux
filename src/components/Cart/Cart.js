import { useSelector } from "react-redux";

import CartItem from "./CartItem";
import Card from "../UI/Card";
import styles from "./Cart.module.css";

const Cart = () => {
  const addToCart = useSelector(state => state.cartOperations.items);

  return (
    <Card className={styles.cart}>
      <h2>Your shopping cart</h2>
      {addToCart.map((data) => (
        <ul key={data.itemID}>
          <CartItem
            id={data.itemID}
            name={data.name}
            totalPrice={data.totalPrice}
            price={data.price}
            quantity={data.quantity}
          />
        </ul>
      ))}
    </Card>
  );
};

export default Cart;
