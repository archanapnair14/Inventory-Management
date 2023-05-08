const Mongoose = require("mongoose");

const challanSchema = new Mongoose.Schema({
  refno: {
    type: String,
    require: true,
  },
  deliverydate: {
    type: String,
    require: true,
  },
  salesId: {
    type: String,
    require: true,
  },
});

const DeliveryChallan = Mongoose.model("deliverychallan", challanSchema);
module.exports = DeliveryChallan;
