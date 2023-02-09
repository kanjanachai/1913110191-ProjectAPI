const User = require("../models/user");

exports.show = async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    data: user,
  });
};

exports.showOne = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);


  res.status(200).json({
    data: user,
  });
};

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = new User({
    name: name,
    email: email,
    password: password,
  });
  await user.save();

  res.status(201).json({
    Message: "ลงทะเบียนเรียบร้อยแล้ว",
  });
};
