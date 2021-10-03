// config/database.js

const env = process.env.NODE_ENV || "dev";
const config = require(__dirname + "/../config/config.json")[env];

module.exports = {
  connection: {
    host: config.host,
    port: config.port,
    user: config.username,
    password: config.password,
    database: config.database,
    dialect: config.dialect,
    connectionLimit: 50,
  },
};
