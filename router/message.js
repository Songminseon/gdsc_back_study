const express = require("express");
const app = express();
const router = express.Router();

const messageService = require("../services/message");

router.get("/", async (req, res) => {
  const result = await messageService.getMessage(req.user.id);
  console.log(result);
  if (result) {
    banList = [];
    newResult = [];

    for (let i = 0; i < result.length; i++) {
      for (let j = i; j < result.length; j++) {
        if (
          result[i].to_id === result[j].from_id &&
          result[i].from_id === result[j].to_id
        ) {
          banList.push(j);
        }
      }
    }

    for (let i = 0; i < result.length; i++) {
      if (result[i]["to_id"] === req.user.id) {
        result[i]["to_id"] = result[i]["from_id"]; //마지막 쪽지가 받은경우일경우
      }
      if (banList.includes(i)) {
      } else {
        newResult.push(result[i]);
      }
    }

    return res.status(200).send({
      success: true,
      data: newResult,
    });
  } else {
    return res.status(400).send({
      success: false,
      data: {},
    });
  }
});

router.get("/detail/:id", async (req, res) => {
  const otherId = req.params.id;
  const result = await messageService.getMessageDetail(req.user.id, otherId);
  console.log(result);
  if (result) {
    return res.status(200).send({
      success: true,
      data: result,
    });
  } else {
    return res.status(400).send({
      success: false,
      data: {},
    });
  }
});

router.post("/", async (req, res) => {
  const { content, to_id } = req.body;
  if (to_id === req.user.id) {
    return res.status(200).send({
      success: false,
      data: {},
      message: "자신에게 메세지를 보낼 수 없습니다.",
    });
  }
  const result = await messageService.sendMessage(content, req.user.id, to_id);
  if (result) {
    return res.status(200).send({
      success: true,
      data: {},
    });
  } else {
    return res.status(400).send({
      success: false,
      data: {},
      message: "Server error",
    });
  }
});

router.delete("/", async (req, res) => {
  const toId = req.body.to_id;
  const result = await messageService.deleteMessage(req.user.id, toId);

  if (result) {
    return res.status(200).send({
      success: true,
      data: {},
    });
  } else {
    return res.status(400).send({
      success: false,
      data: {},
    });
  }
});

module.exports = router;
