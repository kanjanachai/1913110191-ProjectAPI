const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema(
  {
    id: { type: Number},
    fname: { type: String },
    lname: { type: String },
    date: { type: String },
    img: { type: String },
  },
  { collection: "datas" }
);

const card = mongoose.model("datas", cardSchema);

module.exports = card;