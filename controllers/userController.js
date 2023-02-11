const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("../config/index");

exports.show = async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    data: user,
  });
};

exports.showOne = async (req, res, next) => {
  const { _id, name, email, role } = req.user;
  res.status(200).json({
    data: {
      _id: _id,
      name: name,
      email: email,
      role: role,
    },
  });
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }
    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      const error = new Error("อีเมลนี้มีได้ลงทะเบียนในระบบแล้ว");
      error.statusCode = 400;
      throw error;
    }
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = await user.encryptPassword(password);
    await user.save();
    res.status(201).json({
      Message: "ลงทะเบียนเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("ไม่พบผู้ใช้งาน");
      error.statusCode = 404;
      throw error;
    }
    const isValid = await user.checkPassword(password);
    if (!isValid) {
      const error = new Error("รหัสผ่านไม่ถูกต้อง");
      error.statusCode = 401;
      throw error;
    }
    const token = await jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      config.SECRET,
      { expiresIn: "5 days" }
    );
    const expires_in = jwt.decode(token);
    res.status(200).json({
      access_token: token,
      expires_in: expires_in.exp,
      token_type: "Bearer Token",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const du = await User.deleteOne({ _id: id });
    if (du.deletedCount === 0) {
      const error = new Error("ไม่พบผู้ใช้งาน");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({
      message: "ลบผู้ใช้งานเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};
