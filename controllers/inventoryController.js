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
      message: "asdasda",
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pd = await Inventory.deleteOne({ _id: id });
    await Invdetail.deleteMany({ product: id });

    if (pd.deletedCount === 0) {
      res.status(404).json({
        message: "wwwwwwww",
      });
    }
    res.status(200).json({
      message: "pass",
    });
  } catch (error) {}
};

exports.deleteDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pd = await Invdetail.deleteOne({ _id: id });

    if (pd.deletedCount === 0) {
      res.status(404).json({
        message: "wwwwwwww",
      });
    }
    res.status(200).json({
      message: "pass",
    });
  } catch (error) {}
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { product } = req.body;
    const inv = await Inventory.findById(id);
    inv.product = product;
    await inv.save();
    
    res.status(200).json({
      message: "แก้ไข้ข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
  }
};

exports.updateDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, price, quantity } = req.body;
    const inv = await Invdetail.findById(id);
    inv.type = type;
    inv.price = price;
    inv.quantity = quantity;
    await inv.save();

    res.status(200).json({
      message: "แก้ไข้ข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
  }
};
