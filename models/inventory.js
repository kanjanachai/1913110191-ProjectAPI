const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema(
  {
    product: { type: String, require: true, trim: true },
  },
  { 
    toJSON: {virtuals: true},
    timestamps: true,
    collection: "inventorys" }
);

inventorySchema.virtual('invdetail', {
    ref: 'invdetail',
    localField: '_id',
    foreignField: 'product'
})

const inventory = mongoose.model("inventory", inventorySchema);

module.exports = inventory;
