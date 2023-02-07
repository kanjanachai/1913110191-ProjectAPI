const Inventory = require("../models/inventory");
const Invdetail = require("../models/invdetail")

exports.show = async (req, res, next) => {
  const inventory = await Inventory.find().populate("invdetail");
  const formatInventory = inventory.map((inv, index) => {
    return {
        product: inv.product,
    }
  })
  res.status(200).json({
    data: formatInventory,
  });
};

exports.insert = async (req, res, next) => {
  const { product } = req.body;
  const inventory = new Inventory({
    product: product,
    type:{

    }
  });
  await inventory.save();
  res.status(200).json({
    message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
  });
};
