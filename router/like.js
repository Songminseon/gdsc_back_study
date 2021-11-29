const express = require("express");
const app = express();
const router = express.Router();

const likeService = require("../services/like");
const boardService = require("../services/board");

router.get("/:category/:refId", async (req, res) => {
  const category = req.params.category;
  const refId = req.params.refId;

  const result = await likeService.isLiked(category, refId, req.user.id);

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
    if (category === 1) {
      //게시판 좋아요
      boardService.updateBoardLike(refId);
    } else {
      //댓글 좋아요
      boardService.updateCommentLike(refId);
    }

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
