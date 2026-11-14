const Joi = require("joi")
const mongoose = require("mongoose");
module.exports.validationErrorsHandler = (err, req, res, next) => {
    // Handle Validation Errors
    if(Joi.isError(err)) {
        console.log(err.details)
        const errors = err.details.map((error) => ({ field: error.path[0], message: error.message.replaceAll(`\"`, "") }))
        return res.json({
            errors
        })
    } else {
        next(err);
    }
} 