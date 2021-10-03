const express = require("express");
const app = express();
const router = express.Router();

const likeService = require("../services/like");

router.get("/:category/:ref", async (req, res) => {
  const category = req.params.category;
  const refId = req.params.ref;

  const result = await likeService.isLiked(category, refId);

  if (result) {
    if (result.length === 0) {
      return res.status(200).send({
        sucess: true,
        data: { isLiked: false },
      });
    } else {
      return res.status(200).send({
        success: true,
        data: {
          isLiked: true,
        },
      });
    }
  } else {
    return res.status(400).send({
      sucess: false,
      data: {},
    });
  }
});

router.post("/", async (req, res) => {
  const { category, refId } = req.body;

  const result = await likeService.pushLike(req.user.id, category, refId);

  if (result) {
    return res.status(200).send({
      success: true,
      data: {},
    });
  } else {
    return res.status(400).send({
      sucess: false,
      data: {},
      message: "server error",
    });
  }
});

module.exports = router;
