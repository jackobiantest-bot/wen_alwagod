const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRETE_KEY, JWT_REFRESH_SECRETE_KEY, JWT_ACCESS_EXPIRE, JWT_REFRESH_EXPIRE } = process.env;
module.exports.signAccessToken = (payload) => 
    jwt.sign(payload, JWT_ACCESS_SECRETE_KEY, {expiresIn: JWT_ACCESS_EXPIRE});

module.exports.signRefreshToken = (payload) => 
    jwt.sign(payload, JWT_REFRESH_SECRETE_KEY, {expiresIn: JWT_REFRESH_EXPIRE});

module.exports.verifyAccessToken = (accessToken) => 
    jwt.verify(accessToken, JWT_ACCESS_SECRETE_KEY);

module.exports.verifyRefreshToken = (refreshToken) => 
    jwt.verify(refreshToken, JWT_REFRESH_SECRETE_KEY);





