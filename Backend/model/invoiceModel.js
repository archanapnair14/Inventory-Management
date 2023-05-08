const Mongoose = require("mongoose");

const invoiceSchema = Mongoose.Schema({
  invoiceDate: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
  },
  salesId: {
    type: String,
  },
  amount: {
    type: String,
  },
});
const Invoice = Mongoose.model("invoice", invoiceSchema);
module.exports = { Invoice };
