const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      // other fields...
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("Menu", menuSchema);