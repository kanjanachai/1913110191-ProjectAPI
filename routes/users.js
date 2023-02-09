var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

router.get("/", userController.show);

router.get("/:id", userController.showOne);

router.post("/", userController.register);

module.exports = router;
