import Cart from "../models/cartModel.js";

export const addToCart = async (req, res) => {
  try {
    const { cart } = req.body;
    console.log(cart)

    let storeCart;

    storeCart = await Cart.findOne({});

    if (!storeCart) {
      storeCart = await Cart.create({
        items: cart.items,
        totalQuantity: cart.totalQuantity,
      });

      return res.status(201).json({ storeCart });
    }

    for (const items of cart.items) {
      let { itemID, name, price, totalPrice, quantity } = items;

      const findExistingCartItemIndex = storeCart.items.find(
        (item) => item.itemID === itemID
      );

      // console.log(findExistingCartItemIndex);

      if (!findExistingCartItemIndex) {
        storeCart.items.push({
          itemID,
          name,
          price,
          totalPrice,
          quantity,
        });
      } else {
        findExistingCartItemIndex.totalPrice += price;
        findExistingCartItemIndex.quantity += quantity;
      }
    }

    storeCart.totalQuantity = storeCart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    storeCart = await storeCart.save();
    return res.status(200).json({ storeCart });
  } catch (error) {
    res.status(500).json({ message: "Error from add to cart", error });
    console.log(error);
  }
};

export const getAllCart = async (req, res) => {
  try {
    const cart = await Cart.find({});
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json("Error from get all cart items", error);
    console.log(error);
  }
};

export const removeFromCart = async (req, res) => {};
