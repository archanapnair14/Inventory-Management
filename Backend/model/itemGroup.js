const Mongoose = require("mongoose");

const itemGroupSchema = Mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  files: {
    type: String,
  },
});
const ItemGroup = Mongoose.model("group", itemGroupSchema);
module.exports = { ItemGroup };
