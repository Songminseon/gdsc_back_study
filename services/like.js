const { Liked } = require("../models");

exports.isLiked = async (category, refId) => {
  return await Liked.findOne({
    where: {
      like_category: category,
      ref_id: refId,
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
