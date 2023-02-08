var express = require('express');
var router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get("/", inventoryController.show);
router.post("/", inventoryController.insert);
router.post("/:id", inventoryController.insertDetail);
router.delete("/:id", inventoryController.deleteProduct);
router.delete("/detail/:id", inventoryController.deleteDetail);
router.put("/:id", inventoryController.updateProduct)
router.put("/detail/:id", inventoryController.updateDetail)


module.exports = router;