const Card = require('../models/card')

exports.index = async (req, res, next) => {
    const { id } = req.params;
    const card = new Card.findById(id);
    res.status(200).json({
        data : card
    })
}

exports.insert = async (req, res, next) => {
    const { id } = req.params;
    const card = new Card.findById(id);
    res.status(200).json({
        data : card
    })
}