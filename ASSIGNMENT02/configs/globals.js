// global config file so that we dont need to import dotnev in every file
// load all environment variables from teh .env file into process.env

require('dotenv').config();

const configurations = {
    ConnectStrings: {
        MongoDB: process.env.CONN_STR_MONGODB
    }
}

module.exports = configurations;