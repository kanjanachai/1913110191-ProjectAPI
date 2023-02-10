const Inventory = require("../models/inventory");
const Invdetail = require("../models/invdetail");
const { validationResult } = require("express-validator");

// show all product
exports.show = async (req, res, next) => {
  const inventory = await Inventory.find().populate("invdetail");
  res.status(200).json({
    data: inventory
  });
};

// show one product
exports.showOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findById(id).populate("invdetail");
    if (!inventory) {
      const error = new Error("ไม่พบสินค้า");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        data: inventory,
      });
    }
  } catch (error) {
    next(error);
  }
};

// add product
exports.insert = async (req, res, next) => {
  try {
    const { product } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }
    const inventory = new Inventory({
      product: product,
    });
    await inventory.save();
    res.status(200).json({
      message: "เพิ่มสินค้าเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};

// add product detail
exports.insertDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inv = await Inventory.findOne({ _id: id });
    if (!inv) {
      const error = new Error("ไม่พบสินค้า");
      error.statusCode = 400;
      throw error;
    } else {
      const { type, price, quantity } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("ข้อมูลไม่ครบถ้วน");
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
      }
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
    next(error);
  }
};

// delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pd = await Inventory.deleteOne({ _id: id });
    await Invdetail.deleteMany({ product: id });
    if (pd.deletedCount === 0) {
      const error = new Error("ไม่พบสินค้า");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({
      message: "ลบสินค้าเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};

// delete product detail
exports.deleteDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pd = await Invdetail.deleteOne({ _id: id });

    if (pd.deletedCount === 0) {
      const error = new Error("ไม่พบข้อมูลสินค้า");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({
      message: "ลบข้อมูลสินค้าเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};

// update product
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { product } = req.body;
    const inv = await Inventory.findById(id);
    if (!inv) {
      const error = new Error("ไม่พบสินค้า");
      error.statusCode = 400;
      throw error;
    } else {
      inv.product = product;
      await inv.save();
      res.status(200).json({
        message: "แก้ไข้ข้อมูลเรียบร้อยแล้ว",
      });
    }
  } catch (error) {
    next(error);
  }
};

// update product detail
exports.updateDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, price, quantity } = req.body;
    const inv = await Invdetail.findById(id);
    if (!inv) {
      const error = new Error("ไม่พบข้อมูลสินค้า");
      error.statusCode = 400;
      throw error;
    } else {
      inv.type = type;
      inv.price = price;
      inv.quantity = quantity;
      await inv.save();
      res.status(200).json({
        message: "แก้ไข้ข้อมูลเรียบร้อยแล้ว",
      });
    }
  } catch (error) {
    next(error);
  }
};
