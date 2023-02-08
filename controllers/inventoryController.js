const Inventory = require("../models/inventory");
const Invdetail = require("../models/invdetail");

exports.show = async (req, res, next) => {
  const inventory = await Inventory.find().populate("invdetail");

  res.status(200).json({
    data: inventory,
  });
};

exports.insert = async (req, res, next) => {
  const { product } = req.body;
  const inventory = new Inventory({
    product: product,
  });
  await inventory.save();

  res.status(200).json({
    message: "เพิ่มสินค้าเรียบร้อยแล้ว",
  });
};

exports.insertDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const detail = await Inventory.findOne({ _id: id });
    if (!detail) {
      const error = new Error("ไม่พบสินค้า");
      error.statusCode = 400;
      throw error;
    } else {
      const { type, price, quantity } = req.body;
      const invdetail = new Invdetail({
        product: id,
        type: type,
        price: price,
        quantity: quantity,
      });
      await invdetail.save();

      res.status(200).json({
        message: "เพิ่มสินค้าเรียบร้อยแล้ว",
      });
    }
  } catch (error) {
    res.status(400).json({
      message:"asdasda"
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Inventory.deleteOne({ _id: id });
    const destoy = await Invdetail.deleteMany({product: id})

    if (product.deletedCount === 0) {
      res.status(404).json({
        message:"wwwwwwww"
      })
    }
    res.status(200).json({
      message:"pass"
    })
  } catch (error) {
    
  }
}

exports.deleteDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Invdetail.deleteOne({ _id: id });

    if (product.deletedCount === 0) {
      res.status(404).json({
        message:"wwwwwwww"
      })
    }
    res.status(200).json({
      message:"pass"
    })
  } catch (error) {
    
  }
} 
