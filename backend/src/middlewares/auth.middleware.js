const { StatusCodes } = require("http-status-codes");
const { verifyAccessToken } = require("../util/token.util");
module.exports.authenticate = function(req, res, next) {
    try {
        const accessToken = req.cookies['access_token'];
        const decoded = verifyAccessToken(accessToken);
        req.user = decoded;
    } catch (err) {
        if(err.name === "TokenExpiredError") {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Token Expired"
            })
        }
        next(err);
    }
    
}

module.exports.authrize = (...roles) => (req, res, next) => {
    if(!roles.includes(req.user.role)) return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "UNAUTHORIZED"
    })
    return next();
}