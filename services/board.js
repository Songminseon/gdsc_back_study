const Op = require("sequelize").Op;

const { Board, Comment, User } = require("../models");

exports.getBoardByCategory = async (category) => {
  return await Board.findAll({
    where: {
      category,
    },
  });
};

exports.getBoardById = async (boardId) => {
  return await Board.findOne({
    where: {
      id: boardId,
    },
  });
};

exports.createBoard = async (category, userId, title, content, isSecret) => {
  return await Board.create({
    board_category_id: category,
    user_id: userId,
    title: title,
    content: content,
    is_secret: isSecret,
  });
};

exports.getComment = async (boardId) => {
  return await Comment.findAll({
    where: {
      board_id: boardId,
    },
    include: [
      {
        model: User,
        attributes: ["nickname"],
      },
    ],
  });
};

exports.createComment = async (userId, boardId, content, isSecret) => {
  return await Comment.create({
    user_id: userId,
    board_id: boardId,
    content: content,
    is_secret: isSecret,
  });
};

exports.searchBoard = async (word) => {
  return await Board.findOne({
    where: {
      title: {
        [Op.like]: "%" + word + "%",
      },
    },
  });
};
