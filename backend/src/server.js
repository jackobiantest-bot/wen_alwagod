const dotEnv = require("dotenv");
dotEnv.config();
const connect = require("./config/database");
const app = require("./app");

const { PORT, HOST } = process.env;

async function startServer () {
    // 1- Connect To Database
    await connect();

    app.listen(PORT, HOST, () => {
        console.log(`App Is Running On Port ${HOST}:${PORT}`);
    });
}

startServer();
