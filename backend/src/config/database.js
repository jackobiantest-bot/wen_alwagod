const mongoose = require("mongoose");

const { DB_TEST_URL, NODE_ENV } = process.env

/**
 * @async
 * @function connect
 * @returns {Promise<void>} Resolves once the initial database connection is established.
 * @throws {Error} Logs connection errors and exits the process (`process.exit(1)`) rather than propagating the exception.
 *
 */
async function connect () {
    mongoose.connection.on('connected', ()=> {
        console.log("Connected To DataBase");
    });
    
    mongoose.connection.on('error', (err) => {
        console.log("Error Connecting To Database");
        mongoose.connection.close();
        process.exit(1)
    });
    try {
        const connection = await mongoose.connect(NODE_ENV === 'dev' ? DB_TEST_URL: DB_URL);
    } catch (err) {

        if(NODE_ENV!=='dev')
            console.log(err);
        else
            console.log("Error Connecting To The Database");
        
        mongoose.connection.close();
        process.exit(1);
    }

}

module.exports = connect