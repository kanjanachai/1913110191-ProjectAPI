var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');

router.get("/", userController.show);

router.get("/:id", userController.showOne);

router.post("/", [
    body('name').not().isEmpty().withMessage("กรุณาป้อน ชื่อ - สกุล"),
    body('email').not().isEmpty().withMessage("กรุณาป้อน อีเมล").isEmail().withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body('password').not().isEmpty().withMessage("กรุณาป้อน รหัสผ่าน").isLength({ min: 6}).withMessage("รหัสผ่านต้องมี 6 ตัวอักษรขึ้นไป")
], userController.register);

router.post("/login", [
    body('email').not().isEmpty().withMessage("กรุณาป้อน อีเมล").isEmail().withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body('password').not().isEmpty().withMessage("กรุณาป้อน รหัสผ่าน")
], userController.login);

router.delete("/:id", userController.deleteUser);

module.exports = router;
