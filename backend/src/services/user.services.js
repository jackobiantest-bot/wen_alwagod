const { startSession } = require("mongoose");
const User = require("./../models/user.model");
const Wallet = require("./../models/wallet.model");

module.exports.newUser = async (userData) => {
    const session = await startSession()
    let user, wallet;
    try {
        await session.withTransaction(async () => {
            const { name, phone, password, passwordConfirm } = userData;
            [user] = await User.create([{name, phone, password, passwordConfirm}], {session});
            [wallet] = await Wallet.create([{ user: user._id, stationBalances: [], totalBalance: 0 }], {session});
        })
        return { user, wallet }
    }
    finally {
        session.endSession();
    }
}

module.exports.getUser = async (_id) => {
    return await User.findOne({ _id });
}
module.exports.getUserByPhone = async (phone) => {
    return await User.findOne({ phone }).select("+password");
}
