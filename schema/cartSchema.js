const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    items: [
      {
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);

