const mongoose = require("mongoose");
// the ref should be same as the userModel like-- mongoose.model('User', userSchema)
const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please Select a Product"],
      enum: ["iphone", "MacBook Pro", "iMac", "iPad"],
    },
    description: {
      type: String,
      required: [true, "Please provide Product Description"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
