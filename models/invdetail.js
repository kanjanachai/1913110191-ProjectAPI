const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invdetailSchema = new Schema(
  {
    type: { type: String, require: true, trim: true },
    price: { type: Number },
    quantity: { type: Number },
    product: { type: Schema.Types.ObjectId },
  },
  { collection: "invdetail" }
);

const invdetail = mongoose.model("invdetail", invdetailSchema);

module.exports = invdetail;
