const Mongoose = require("mongoose");

const purchaseSchema = new Mongoose.Schema({
  vendorname: {
    type: String,
    require: true,
  },
  itemname: {
    type: String,
    require: true,
  },
  quantity: {
    type: String,
    require: true,
  },
  amount: {
    type: String,
    require: false,
  },
  status: {
    type: String,
    required: true,
  },
});

const Purchases = Mongoose.model("purchase", purchaseSchema);
module.exports = Purchases;
