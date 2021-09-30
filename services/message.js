const { Message } = require("../models");

exports.getMessage = async (userId) => {
  return await Message.findAll({
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
  });
};

exports.getMessageDetail = async (toId, fromId) => {
  return await Message.findAll({
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
  });
};

exports.sendMessage = async (fromId, toId) => {
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
