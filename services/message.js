const Op = require("sequelize").Op;
const { Message, sequelize } = require("../models");

exports.getMessage = async (userId) => {
  const rawQuery = `SELECT * FROM messages WHERE (from_id = ${userId} or to_id = ${userId}) and created_at IN (SELECT max(created_at) FROM messages GROUP BY from_id, to_id) ORDER BY created_at DESC`;
  return await sequelize.query(rawQuery, { type: sequelize.QueryTypes.SELECT });
};

exports.getMessageDetail = async (toId, fromId) => {
  return await Message.findAll({
    attributes: ["id", "content", "created_at", "from_id", "to_id"],
    where: {
      [Op.or]: [
        {
          from_id: fromId,
          to_id: toId,
        },
        {
          from_id: toId,
          to_id: fromId,
        },
      ],
    },
    order: [["created_at", "DESC"]],
  });
};

exports.sendMessage = async (content, fromId, toId) => {
  return await Message.create({
    content,
    from_id: fromId,
    to_id: toId,
  });
};

exports.deleteMessage = async (fromId, toId) => {
  return await Message.destroy({
    where: {
      [Op.or]: [
        { from_id: fromId, to_id: toId },
        { from_id: toId, to_id: fromId },
      ],
    },
  });
};
