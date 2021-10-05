const { Liked } = require("../models");

exports.isLiked = async (category, refId, userId) => {
  return await Liked.findAll({
    where: {
      like_category: category,
      ref_id: refId,
      user_id: userId,
    },
  });
};

exports.pushLike = async (userId, category, refId) => {
  return await Liked.create({
    like_category: category,
    ref_id: refId,
    user_id: userId,
  });
};
