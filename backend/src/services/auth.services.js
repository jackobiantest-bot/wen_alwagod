const { newUser, getUserByPhone } = require("./user.services");
const { signAccessToken } = require("./../util/token.util");

module.exports.register = async (credinatials) => {

    const {user, wallet} = await newUser(credinatials);
    const accessToken = signAccessToken({ id: user._id, role: user.role });

    return {
        user,
        accessToken
    }
}

module.exports.login = async (credinatials) => {
    const { password, phone } = credinatials;
    const user = await getUserByPhone(phone);
    if(await !user.comparePassword(password))
        throw new Error("Invalid credentials");

    const accessToken = signAccessToken({ id: user._id, role: user.role });
    
    return {
        user,
        accessToken
    }
}