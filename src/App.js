import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Layout from "./components/Main Layout/Layout";
import Cart from "./components/Cart/Cart";
import ShopContent from "./components/Shop/ShopContent";
import { cartActions } from "./store/cart";

let isInitial = true;

const App = () => {
  const showCart = useSelector((state) => state.showCart.showCart);
  const cart = useSelector((state) => state.cartOperations);
  const dispatch = useDispatch();
  const isSyncing = useRef(false);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    const debounceTimeout = setTimeout(() => {
      const sendCartData = async () => {
        try {
          if (isSyncing.current) return;

          isSyncing.current = true;

          const response = await fetch("http://localhost:8080/add-to-cart", {
            method: "PUT",
            body: JSON.stringify({ cart }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Sending cart data failed");
          }

          const { storeCart } = await response.json();
          console.log("executed times");

          dispatch(cartActions.replaceCart(storeCart));
        } catch (error) {
          console.log(error);
        } finally {
          isSyncing.current = false;
        }
      };

      sendCartData();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [cart, dispatch]);

  return (
    <>
      <Layout>
        {showCart && <Cart />}
        <ShopContent />
      </Layout>
    </>
  );
};

export default App;
