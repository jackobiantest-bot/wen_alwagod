const { signRefreshToken } = require("../util/token.util");
const RefreshToken = require("./../models/refreshToken.model");
const authServices = require("./../services/auth.services");

const createRefreshToken = async (user, req) => {
    try {
        const token = signRefreshToken({ id: user._id, role: user.role });
        const expiresAt = Date.now() + 10 * 24 * 60 * 60 * 1000;

        await RefreshToken.create({
            token, 
            user: user._id, 
            expiresAt,
            userAgent: req.headers['user-agent'],
            ip: req.ip
        });

        return token
    } catch (err) {
        console.error(err);
    }


}

module.exports.register = async (req, res, next) => {
    try {
        const { user, accessToken } = await authServices.register(req.validatedBody);
        const refreshToken = await createRefreshToken(user, req);
        
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'dev',
            sameSite: 'strict',
            maxAge: 10 * 24 * 60 * 60 * 1000
        });
        
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'dev',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        return res.json({
            user
        });

    }   catch(error) {
        next(error)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { user, accessToken } = await authServices.login(req.validatedBody);
        const refreshToken = await createRefreshToken(user, req);

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'dev',
            sameSite: 'strict',
            maxAge: 10 * 24 * 60 * 60 * 1000
        });
        
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'dev',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        res.json({
            user: {
                _id: user._id,
                name: user.name,
                phone: user.phone,
                role: user.role
            }
        });
    } catch(error) {
        next(error)
    }
}

module.exports.refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies['refresh_token'];
        if(!refreshToken) throw new Error("Refresh token not found");
        verifyRefreshToken(refreshToken, async (err, decoded) => {
            if(err) throw new Error("Invalid refresh token");
            const user = await getUserById(decoded.id);
            if(!user) throw new Error("User not found");
            const accessToken = signAccessToken({ id: user._id, role: user.role });
            res.cookie('access_token', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'dev',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000
            });
        });
    } catch(error) {
        next(error)
    }
}

module.exports.logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies['refresh_token'];
        if(!refreshToken) throw new Error("Refresh token not found");
        await RefreshToken.deleteOne({ token: refreshToken });
        res.clearCookie('refresh_token');
        res.clearCookie('access_token');
        res.json({
            message: "Logged out successfully"
        });
    } catch(error) {
        next(error)
    }
}