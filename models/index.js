"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.Board = require("./Board")(sequelize, Sequelize);
db.BoardCategory = require("./BoardCategory")(sequelize, Sequelize);
db.BoardScrap = require("./BoardScrap")(sequelize, Sequelize);
db.Comment = require("./Comment")(sequelize, Sequelize);
db.Recomment = require("./Recomment")(sequelize, Sequelize);
db.Liked = require("./Liked")(sequelize, Sequelize);
db.Message = require("./Message")(sequelize, Sequelize);
db.Pinned = require("./Pinned")(sequelize, Sequelize);

db.Board.belongsTo(db.User); //유저 1명이 여러개의 게시 가능
db.Board.belongsTo(db.BoardCategory); //카테고리 1개가 여러 게시 가능

db.BoardScrap.belongsTo(db.Board);
db.BoardScrap.belongsTo(db.User);

db.Comment.belongsTo(db.Board);
db.Comment.belongsTo(db.User);

db.Recomment.belongsTo(db.Comment);
db.Recomment.belongsTo(db.User);

db.Liked.belongsTo(db.User);

db.Pinned.belongsTo(db.BoardCategory);

db.Message.belongsTo(db.User, { as: "from" });
db.Message.belongsTo(db.User, { as: "to" });

module.exports = db;
