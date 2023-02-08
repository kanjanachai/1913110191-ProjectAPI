const User = require('../models/user');

exports.show = async (req, res, next) => {
    const user = await User.find();
  
    res.status(200).json({
      data: user,
    });
  };