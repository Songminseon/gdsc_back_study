const { User, EmailAuth } = require("../models/index");
const common = require("./common");

exports.getUser = async (userId) => {
  return await User.findOne({
    attributes: [
      "user_id",
      "email",
      "name",
      "nickname",
      "major",
      "profile_pic",
      "is_auth",
    ],
    where: {
      id: userId,
    },
  });
};

exports.updateUser = async (userId, nickname) => {
  return await User.update(
    {
      nickname,
    },
    {
      where: {
        id: userId,
      },
    }
  );
};

exports.deleteUser = async (userId) => {
  return await User.destroy({
    where: {
      id: userId,
    },
  });
};

exports.getEmail = async (email, userId) => {
  return await EmailAuth.create({
    email: email,
    code: common.getRandomCode(),
    user_id: userId,
  });
};

exports.authEmail = async (code) => {
  return await EmailAuth.findOne({
    where: {
      code: code,
      send_date: {
        [Op.lte]: new Date(),
        [Op.gte]: new Date(new Date() - 5 * 60 * 1000),
      },
    },
  });
};
