var express = require('express');
var router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { body } = require('express-validator');
const passportJWT = require('../middleware/passportJWT');
const checkAdmin = require('../middleware/checkAdmin');

router.get("/", inventoryController.show);

router.get("/:id", inventoryController.showOne);

router.post("/", [ passportJWT.isLogin, checkAdmin.isAdmin,
    body('product').not().isEmpty().withMessage("กรุณาป้อนสินค้า"),
], inventoryController.insert);
    
router.post("/:id", [ passportJWT.isLogin, checkAdmin.isAdmin,
    body('type').not().isEmpty().withMessage("กรุณาป้อนชนิดของสินค้า"),
    body('price').not().isEmpty().withMessage("กรุณาป้อนราคาสินค้า"),
    body('quantity').not().isEmpty().withMessage("กรุณาป้อนจำนวนสินค้า"),
], inventoryController.insertDetail);

router.put("/:id", [passportJWT.isLogin, checkAdmin.isAdmin], inventoryController.updateProduct)

router.put("/detail/:id", [passportJWT.isLogin, checkAdmin.isAdmin], inventoryController.updateDetail)

router.delete("/:id", [passportJWT.isLogin, checkAdmin.isAdmin], inventoryController.deleteProduct);

router.delete("/detail/:id", [passportJWT.isLogin, checkAdmin.isAdmin], inventoryController.deleteDetail);

module.exports = router;