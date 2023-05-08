const Mongoose = require("mongoose");

const salesSchema = Mongoose.Schema({
  salesid: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
  },
  status: {
    type: String,
  },
});
const salesReturns = Mongoose.model("salesreturns", salesSchema);
module.exports = { salesReturns };
