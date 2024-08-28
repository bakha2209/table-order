const Order = require("../schema/orderSchema");
const Cart = require("../schema/cartSchema");
const { shapeIntoMongooseObjectId } = require("../lib/config");
let orderController = module.exports;

orderController.placeOrder = async (req, res) => {
  try {
    console.log(`POST: cont/placeOrder`);

    // Convert member_id to ObjectId
    const member_id = shapeIntoMongooseObjectId(req.member._id);

    // Find the cart for the user
    const cart = await Cart.findOne({ userId: member_id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    // Create a new order with the items from the cart
    const order = new Order({
      userId: member_id,
      tableId: req.body.tableId, // Assume tableId is provided in the request body
      items: cart.items,
      status: "confirm", // Set the initial status to 'confirm'
    });

    await order.save();

    // Optionally clear the cart after placing the order
    cart.items = [];
    await cart.save();

    res.json({ msg: "Order placed successfully", order });
  } catch (err) {
    console.log(`ERROR, cont/placeOrder, ${err.message}`);
    res.status(500).json({ state: "fail", message: err.message });
  }
};

orderController.updateOrderStatus = async (req, res) => {
  try {
    console.log(`PUT: cont/updateOrderStatus`);
    const { orderId, status } = req.body;

    // Validate the status
    if (!["complete", "cancel"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    // Convert orderId to ObjectId if necessary
    const order_id = shapeIntoMongooseObjectId(orderId);
    console.log("Order ID:", order_id);

    // Find the order by ID
    const order = await Order.findById(order_id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    // Update the order status
    order.status = status;
    await order.save();

    res.json({ msg: `Order status updated to ${status}`, order });
  } catch (err) {
    console.log(`ERROR, cont/updateOrderStatus, ${err.message}`);
    res.status(500).json({ state: "fail", message: err.message });
  }
};

orderController.orderHistory=async(req, res) => {
    try {
        console.log(`PUT: cont/orderHistory`); 

        const member_id = shapeIntoMongooseObjectId(req.member._id);

        const orders = await Order.find({ userId: member_id }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ msg: 'No orders found' });
    }

    res.json(orders);
    }catch(err) {
        console.log(`ERROR, cont/orderHistory, ${err.message}`);
        res.status(500).json({ state: "fail", message: err.message });  
    }
}
