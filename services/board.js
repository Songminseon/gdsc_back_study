const Op = require("sequelize").Op;

const { Board, Comment, User, sequelize } = require("../models");

exports.getMainBoard = async () => {
  const rawQuery =
    "SELECT * FROM boards WHERE board_category_id <= 6  and created_at IN (SELECT MAX(created_at) FROM boards GROUP BY board_category_id)";
  return await sequelize.query(rawQuery, { type: sequelize.QueryTypes.SELECT });
};

exports.getHotBoard = async (isLimit) => {
  let query;
  query = {
    attributes: [
      "id",
      "comment_num",
      "like_num",
      "created_at",
      "title",
      "content",
    ],
    where: {
      is_hot: true,
    },
    order: [["created_at", "DESC"]],
  };

  if (isLimit) {
    query.limit = 2;
  }

  return await Board.findAll(query);
};

exports.getRealtimeBoard = async () => {
  const rawQuery =
    "SELECT p.*, like_num+comment_num as total, q.user_id, q.profile_pic FROM gdsc_back.boards as p JOIN gdsc_back.users as q ON p.user_id = q.id  WHERE is_hot = 1 and p.created_at > DATE_ADD(now(), INTERVAL -24 HOUR) order by total DESC, p.created_at DESC LIMIT 2";
  return await sequelize.query(rawQuery, { type: sequelize.QueryTypes.SELECT });
};

exports.getBoardByCategory = async (category) => {
  return await Board.findAll({
    where: {
      board_category_id: category,
    },
    order: [["created_at", "DESC"]],
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
      "is_secret",
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

exports.getFilterBoard = async (category, isHot) => {
  return await Board.findAll({
    attributes: ["id", "title", "like_num", "comment_num", "created_at"],
    where: {
      board_category_id: parseInt(category),
      is_hot: parseInt(isHot),
    },
    limit: 2,
    order: [["created_at", "DESC"]],
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

exports.updateCommentLike = async (commentId) => {
  const prevComment = await Comment.findOne({
    attributes: ["like_num"],
    where: {
      id: commentId,
    },
  });

  const prevNum = prevComment.like_num;

  await Comment.update(
    {
      like_num: prevNum + 1,
    },
    {
      where: {
        id: commentId,
      },
    }
  );
};

exports.updateBoardComment = async (boardId) => {
  const prevBoard = await Board.findOne({
    attributes: ["comment_num"],
    where: {
      id: boardId,
    },
  });

  const prevNum = prevBoard.comment_num;

  await Board.update(
    {
      comment_num: prevNum + 1,
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
    attributes: [
      "id",
      "created_at",
      "content",
      "is_secret",
      "like_num",
      "user_id",
    ],
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
    like_num: 0,
  });
};

exports.searchBoard = async (word) => {
  return await Board.findAll({
    attributes: [
      "id",
      "comment_num",
      "like_num",
      "created_at",
      "title",
      "content",
      "is_secret",
    ],
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: "%" + word + "%",
          },
        },
        {
          content: {
            [Op.like]: "%" + word + "%",
          },
        },
      ],
    },
    include: [
      {
        model: User,
        attributes: ["nickname", "profile_pic"],
      },
    ],
  });
};
