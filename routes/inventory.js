var express = require('express');
var router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get("/", inventoryController.show);
router.post("/", inventoryController.insert);
router.post("/:id", inventoryController.insertDetail);


module.exports = router;