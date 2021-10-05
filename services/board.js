const Op = require("sequelize").Op;

const { Board, Comment, User } = require("../models");

exports.getBoardByCategory = async (category) => {
  return await Board.findAll({
    where: {
      board_category_id: category,
    },
  });
};

exports.getBoardById = async (boardId) => {
  return await Board.findOne({
    attributes: [
      "board_category_id",
      "created_at",
      "title",
      "content",
      "like_num",
      "comment_num",
    ],
    where: {
      id: boardId,
    },
    include: [
      {
        model: User,
        attributes: ["nickname"],
      },
    ],
  });
};

exports.updateBoardLike = async (boardId) => {
  const prevBoard = await Board.findOne({
    attributes: ["like_num"],
    where: {
      id: boardId,
    },
  });

  const prevNum = prevBoard.like_num;

  await Board.update(
    {
      like_num: prevNum + 1,
    },
    {
      where: {
        id: boardId,
      },
    }
  );
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
    attributes: ["created_at", "content"],
    where: {
      board_id: boardId,
    },
    include: [
      {
        model: User,
        attributes: ["nickname"],
      },
    ],
    underscored: true,
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
