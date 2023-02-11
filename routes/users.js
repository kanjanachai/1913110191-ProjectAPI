var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');

const passportJWT = require('../middleware/passportJWT');
const checkAdmin = require('../middleware/checkAdmin');


router.get("/",[passportJWT.isLogin, checkAdmin.isAdmin], userController.show);

router.get("/me",[passportJWT.isLogin], userController.showOne);

router.post("/", [
    body('name').not().isEmpty().withMessage("กรุณาป้อน ชื่อ - สกุล"),
    body('email').not().isEmpty().withMessage("กรุณาป้อน อีเมล").isEmail().withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body('password').not().isEmpty().withMessage("กรุณาป้อน รหัสผ่าน").isLength({ min: 6}).withMessage("รหัสผ่านต้องมี 6 ตัวอักษรขึ้นไป")
], userController.register);

router.post("/login", [
    body('email').not().isEmpty().withMessage("กรุณาป้อน อีเมล").isEmail().withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body('password').not().isEmpty().withMessage("กรุณาป้อน รหัสผ่าน")
], userController.login);

router.delete("/:id", [passportJWT.isLogin, checkAdmin.isAdmin], userController.deleteUser);

module.exports = router;
