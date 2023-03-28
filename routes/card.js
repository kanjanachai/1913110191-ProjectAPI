var express = require('express');
var router = express.Router();
const cardController = require('../controllers/cardController')

router.get("/:id", cardController.index);


module.exports = router;