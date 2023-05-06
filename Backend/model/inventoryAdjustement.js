const Mongoose = require("mongoose");

const inventoryAdjustement = Mongoose.Schema({
  mode: {
    type: String,
    require: true,
  },
  refno: {
    type: String,
    require: true,
  },
  itemid: {
    type: String,
    require: true,
  },
  Quantity: {
    type: String,
    require: true,
  },
  values: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: false,
  },
  reason: {
    type: String,
    required: false,
  },
  files: {
    type: String,
    require: true,
  },
  ereason: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});
const inventory = Mongoose.model("inventory", inventoryAdjustement);
module.exports = { inventory };
