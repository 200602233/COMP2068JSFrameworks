// global config file so that we dont need to import dotnev in every file
// load all environment variables from teh .env file into process.env

require('dotenv').config();

const configurations = {
    ConnectStrings: {
        MongoDB: process.env.CONN_STR_MONGODB,
        MongoDBBackup: process.env.CONN_STR_MONGODB_BACKUP
    },
    Authentication: {
    GitHub: {
      ClientId: process.env.GITHUB_CLIENT_ID,
      ClientSecret: process.env.GITHUB_CLIENT_SECRET,
      CallbackUrl: process.env.GITHUB_CALLBACK_URL
    },
  },
};

module.exports = configurations;