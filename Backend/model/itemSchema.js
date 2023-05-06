const Mongoose = require("mongoose");

const itemSchema = Mongoose.Schema({
  itemName: {
    type: String,
    require: true,
  },
  unit: {
    type: String,
    require: true,
  },
  sellingPrice: {
    type: String,
    require: true,
  },
  costPrice: {
    type: String,
    require: true,
  },
  dimension: {
    type: String,
    require: true,
  },
  weight: {
    type: String,
    require: true,
  },
  manufacturer: {
    type: String,
    require: true,
  },
  brand: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: false,
  },
  openingStock: {
    type: String,
    require: true,
  },
  reorderPoint: {
    type: String,
    require: true,
  },

  preferredvendor: {
    type: String,
    require: false,
  },
  category: {
    type: String,
    require: true,
  },
  files: {
    type: String,
    require: true,
  },
  estatus: {
    type: String,
    required: false,
  },
});
const AllItems = Mongoose.model("item", itemSchema);
module.exports = { AllItems };
