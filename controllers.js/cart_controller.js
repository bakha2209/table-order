const { shapeIntoMongooseObjectId } = require("../lib/config");
const Cart = require("../schema/cartSchema");
let cartController = module.exports;

cartController.addToCart = async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;

    let cart = await Cart.findOne({ userId: req.member._id });

    if (!cart) {
      cart = new Cart({
        userId: req.member._id,
        items: [{ menuItem: menuItemId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.menuItem.toString() === menuItemId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ menuItem: menuItemId, quantity });
      }
    }

    cart.updatedAt = Date.now();
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.log(`ERROR, cont/addToCart, ${err.message}`);
    res.status(500).json({ state: "fail", message: err.message });
  }
};

cartController.updateCartItem = async (req, res) => {
  try {
    console.log(`PUT: cont/updateCartItem`);
    const { menuItemId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ msg: "Quantity must be at least 1" });
    }

    // Find the cart for the user
    const member_id = shapeIntoMongooseObjectId(req.member._id);
    console.log("req.member.id", member_id);
    const cart = await Cart.findOne({ userId: member_id });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.menuItem.toString() === menuItemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ msg: "Item not found in cart" });
    }

    // Update the quantity
    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.log(`ERROR, cont/updateCartItem, ${err.message}`);
    res.status(500).json({ state: "fail", message: err.message });
  }
};

cartController.removeCartItem = async (req, res) => {
    try {
      console.log(`DELETE: cont/removeCartItem`);
      const { menuItemId } = req.body;
  
      // Convert member_id to ObjectId
      const member_id = shapeIntoMongooseObjectId(req.member._id);
      console.log("req.member.id", member_id);
  
      // Find the cart for the user
      const cart = await Cart.findOne({ userId: member_id });
  
      if (!cart) {
        return res.status(404).json({ msg: 'Cart not found' });
      }
  
      // Find the item in the cart
      const itemIndex = cart.items.findIndex(item => item.menuItem.toString() === menuItemId);
  
      if (itemIndex === -1) {
        return res.status(404).json({ msg: 'Item not found in cart' });
      }
  
      // Remove the item from the array
      cart.items.splice(itemIndex, 1);
      await cart.save();
  
      res.json({ msg: 'Item removed from cart', cart });
    } catch (err) {
      console.log(`ERROR, cont/removeCartItem, ${err.message}`);
      res.status(500).json({ state: "fail", message: err.message });
    }
  };
