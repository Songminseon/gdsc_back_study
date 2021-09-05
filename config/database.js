module.exports = {
  development: {
    username: "local",
    password: "localpassword",
    database: "gdsc-back",
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      timezone: "+09:00",
    },
    timezone: "+09:00",
    operatorsAliases: false,
  },
};
