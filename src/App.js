import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Layout from "./components/Main Layout/Layout";
import Cart from "./components/Cart/Cart";
import ShopContent from "./components/Shop/ShopContent";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";
let isInitial = true;

const App = () => {
  const showCart = useSelector((state) => state.showCart.showCart);
  const showNotification = useSelector(
    (state) => state.showCart.showNotification
  );
  const cart = useSelector((state) => state.cartOperations);

  const dispatch = useDispatch();

  // @desc: dispatch action to fetch data from the db and replace redux store
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // @desc: dispatch action to send data to db 
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {showNotification && (
        <Notification
          status={showNotification.status}
          title={showNotification.title}
          message={showNotification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <ShopContent />
      </Layout>
    </>
  );
};

export default App;
