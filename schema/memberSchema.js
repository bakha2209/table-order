const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: { unique: true, sparse: true },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    // other fields...
  },
  { timestamps: true }
);





module.exports = mongoose.model("User", userSchema);


