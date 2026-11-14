const { Router } = require("express")

const authController = require("./../controllers/auth.controller")

const authValidator = require("./../validators/auth.validator")

const authRoute = Router();

authRoute.post("/register", authValidator.register, authController.register);
authRoute.post("/login", authValidator.login, authController.login);
authRoute.get("/refresh", authController.refreshToken);
authRoute.post("/logout", authController.logout);

module.exports = authRoute;