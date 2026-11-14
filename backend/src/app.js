const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const apiRoute = require("./routes");
const mongoose = require("mongoose");
const Joi = require("joi");
const {validationErrorsHandler} = require('./errors/validation.errors');
const {duplicatesErrorHandler} = require('./errors/duplicates.errors');

const app = express();

const { CLIENT_URL, APP_VERISON = "1" } = process.env;

// app.use(cors({
//     origin: CLIENT_URL,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     credentials: true
// }));
app.use(cookieParser());
app.use(express.json());


app.use(`/api/${APP_VERISON}`, apiRoute);

app.use(validationErrorsHandler)
app.use(duplicatesErrorHandler)

module.exports = app;