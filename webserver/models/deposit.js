const mongoose = require("mongoose");
const uuid = require("uuid");

const DepositSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  _id: { type: String, default: uuid.v1 },
  dateAdded: {
    type: Number,
    default: Date.now
  },
  current: {
    type: Number,
    required: true
  },
  goal: {
    type: Number,
    required: true
  }
});

module.exports = Deposit = mongoose.model("Deposit", DepositSchema);