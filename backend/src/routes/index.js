const { Router } = require("express");

const authRoute = require("./auth.route");

const apiRoute = Router();

apiRoute.use("/auth", authRoute);


module.exports = apiRoute;