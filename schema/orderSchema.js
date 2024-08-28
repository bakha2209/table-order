const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
      userId: mongoose.Schema.Types.ObjectId,
      tableId: String,
      items: [{ menuItem: mongoose.Schema.Types.ObjectId, quantity: Number }],
      status: { type: String, enum: ["confirm", "cancel", "complete"] },
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("Order", orderSchema);