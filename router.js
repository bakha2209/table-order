const express = require("express");
const router = express.Router();

const menuController = require("./controllers.js/menu_controller");
const memberController = require("./controllers.js/member_controller");
const orderController = require("./controllers.js/order_controller");
const cartController = require("./controllers.js/cart_controller");

//member related routers
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);

//menu related routers
router.get("/menu", menuController.allMenu);
router.get("/menu/:id", menuController.chosenProduct);

//cart related routers
router.post(
  "/cart",
  memberController.retrieveAuthMember,
  cartController.addToCart
);
router.put(
  "/cart/updateQuantity",
  memberController.retrieveAuthMember,
  cartController.updateCartItem
);
router.delete(
  "/cart/deleteItem",
  memberController.retrieveAuthMember,
  cartController.removeCartItem
);

//order related routers
router.post(
  "/order",
  memberController.retrieveAuthMember,
  orderController.placeOrder
);
router.put(
  "/order/updateOrder",
  memberController.retrieveAuthMember,
  orderController.updateOrderStatus
);
router.get(
  "/order/history",
  memberController.retrieveAuthMember,
  orderController.orderHistory
);
module.exports = router;
