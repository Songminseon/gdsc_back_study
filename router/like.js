const express = require("express");
const app = express();
const router = express.Router();

const likeService = require("../services/like");

router.get("/", async (req, res) => {
  const result = await likeService.isLiked();

  if (result) {
    return res.status(200).send({
      sucess: true,
      data: {},
    });
  } else {
    return res.status(400).send({
      sucess: false,
      data: {},
    });
  }
});

router.post("/", async (req, res) => {
  const result = await likeService.pushLike();

  if (result) {
    return res.status(200).send({
      success: true,
      data: {},
    });
  } else {
    return res.status(400).send({
      sucess: false,
      data: {},
    });
  }
});

module.exports = router;
