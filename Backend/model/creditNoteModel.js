const Mongoose = require("mongoose");

const creditNoteSchema = Mongoose.Schema(
  {
    CreditID: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    creditNoteDate: {
      type: Date,
      required: true,
    },
  },
);

const creditNote = Mongoose.model("creditnote", creditNoteSchema);
module.exports = { creditNote };
