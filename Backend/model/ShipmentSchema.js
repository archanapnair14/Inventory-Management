const Mongoose = require("mongoose");

const ShipmentSchema = Mongoose.Schema({
  salesid: {
    type: String,
    required: true,
  },
  trackingno: {
    type: String,
    required: true,
  },
  tamount: {
    type: String,
  },
  sdate: {
    type: Date,
    require: false,
  },
});
const Shipment = Mongoose.model("packages", ShipmentSchema);
module.exports = { Shipment };
