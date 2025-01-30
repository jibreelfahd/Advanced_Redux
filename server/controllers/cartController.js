import Cart from "../models/cartModel.js";

export const addToCart = async (req, res) => {
  try {
    const { items, totalQuantity } = req.body;

    let storeCart;

    storeCart = await Cart.findOne({});

    if (!storeCart) {
      storeCart = await Cart.create({
        items: items,
        totalQuantity: totalQuantity,
      });

      return res.status(201).json({ storeCart });
    }

    for (const item of items) {
      let { itemID, name, price, totalPrice, quantity } = item;

      const findExistingCartItemIndex = storeCart.items.find(
        (item) => item.itemID === itemID
      );

      if (!findExistingCartItemIndex) {
        storeCart.items.push({
          itemID,
          name,
          price,
          totalPrice,
          quantity,
        });
      } else {
        findExistingCartItemIndex.totalPrice = price;
        findExistingCartItemIndex.quantity = quantity;
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
    const cart = await Cart.findOne({});

    if (!cart) {
      return;
    }
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json("Error from get all cart items", error);
    console.log(error);
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id)

    const findCart = await Cart.findOne({});

    if (!findCart) {
      return;
    }

    const findItem = findCart.items.filter((item) => item.itemID === id);

    if (!findItem) {
      return;
    }

    findCart.items = findCart.items.filter((item) => item.itemID !== id);

    if (findCart.items.length === 0) {
      await Cart.deleteOne({ _id: findCart._id})
    }

    console.log(findCart.items.length)

    findCart.totalQuantity = findCart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    await findCart.save();

    res.status(200).json({ message: "Item removed succesfully " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Error from get remove items", error});
  }
};
