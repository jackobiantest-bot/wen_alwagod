const Joi = require("joi")
const mongoose = require("mongoose");
module.exports.duplicatesErrorHandler = (err, req, res, next) => {
    // Handle Duplication Errors
    console.log(err);
    if(err?.code === 11000) {
        return res.json({
           errors: Object.keys(err?.keyValue).map(field => ({ field, message: 'Already registred' }))
        })
    }
} 