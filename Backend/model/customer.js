const Mongoose = require("mongoose");

const customerSchema = Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
});
const customerModel = Mongoose.model("customers", customerSchema);
module.exports = { customerModel };
