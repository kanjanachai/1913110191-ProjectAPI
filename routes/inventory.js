var express = require('express');
var router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { body } = require('express-validator');

router.get("/", inventoryController.show);

router.get("/:id", inventoryController.showOne);

router.post("/", [
    body('product').not().isEmpty().withMessage("กรุณาป้อนสินค้า"),
], inventoryController.insert);
    
router.post("/:id", [
    body('type').not().isEmpty().withMessage("กรุณาป้อนชนิดของสินค้า"),
    body('price').not().isEmpty().withMessage("กรุณาป้อนราคาสินค้า"),
    body('quantity').not().isEmpty().withMessage("กรุณาป้อนจำนวนสินค้า"),
], inventoryController.insertDetail);

router.delete("/:id", inventoryController.deleteProduct);

router.delete("/detail/:id", inventoryController.deleteDetail);

router.put("/:id", inventoryController.updateProduct)

router.put("/detail/:id", inventoryController.updateDetail)

module.exports = router;