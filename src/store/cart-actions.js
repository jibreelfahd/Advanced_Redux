import { showCartActions } from "./show-cart";
import { cartActions } from "./cart";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      showCartActions.showNotificationHandler({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data",
      })
    );

    const sendData = async () => {
      const response = await fetch("http://localhost:8080/add-to-cart", {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };

    try {
      await sendData();

      dispatch(
        showCartActions.showNotificationHandler({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        showCartActions.showNotificationHandler({
          status: "error",
          title: "Sending Failed!!",
          message: "Sending cart data failed",
        })
      );
      console.log(error);
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/all-cart");

      if (!response.ok) {
        throw new Error("Fetching cart data failed!");
      }

      const { cart } = await response.json();
      return cart;
    };

    try {
      const cartData = await fetchData();
      // console.log(cartData);
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        showCartActions.showNotificationHandler({
          status: "error",
          title: "Fetching Failed!!",
          message: "Fetching cart data failed",
        })
      );
      console.log(error);
    }
  };
};

export const deleteCartData = (id) => {
  console.log(id)
  return async (dispatch) => {
    const removeCartItem = async () => {
      const response = await fetch("http://localhost:8080/remove-from-cart", {
        method: "DELETE",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      return data;
    };

    try {
      await removeCartItem();
    } catch (error) {
      dispatch(
        showCartActions.showNotificationHandler({
          status: "error",
          title: "Deleting Item Failed!!",
          message: "Deleting Item from cart failed",
        })
      );
      console.log(error);
    }
  };
};
