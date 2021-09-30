const express = require("express");
const app = express();
const router = express.Router();

const messageService = require("../services/message");

router.get("/", async (req, res) => {
  const result = await messageService.getMessage(req.user.id);

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

router.get("/:id", async (req, res) => {
  const otherId = req.params.id;
  const result = await messageService.getMessageDetail(req.user.id, otherId);

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

router.post("/:id", async (req, res) => {
  const result = await messageService.sendMessage();
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

router.delete("/:id", async (req, res) => {
  const result = await messageService.deleteMessage();

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
