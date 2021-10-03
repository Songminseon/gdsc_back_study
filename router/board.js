const express = require("express");
const app = express();
const router = express.Router();

const boardService = require("../services/board");

router.get("/:category", async (req, res) => {
  const category = req.params.category;

  const result = await boardService.getBoardByCategory(category);

  if (result) {
    return res.status(200).send({
      success: true,
      data: result,
    });
  } else {
    return res.status(400).send({
      success: false,
      data: {},
      message: "server error",
    });
  }
});

router.get("/detail/:id", async (req, res) => {
  const boardId = req.params.id;

  const result = await boardService.getBoardById(boardId);

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
  const { category_id, title, content, is_secret } = req.body;

  const result = await boardService.createBoard(
    category_id,
    req.user.id,
    title,
    content,
    is_secret
  );

  if (result) {
    return res.status(200).send({
      success: true,
      data: {},
    });
  } else {
    return res.status(400).send({
      success: false,
      data: {},
      message: "server error",
    });
  }
});

router.get("/:id/comment", async (req, res) => {
  const boardId = req.params.id;
  const result = await boardService.getComment(boardId);

  if (result) {
    return res.status(200).send({
      success: true,
      data: result,
    });
  } else {
    return res.status(400).send({
      success: false,
      data: {},
      message: "server error",
    });
  }
});

router.post("/comment", async (req, res) => {
  const { board_id, content, is_secret } = req.body;
  const result = await boardService.createComment(
    req.user.id,
    board_id,
    content,
    is_secret
  );

  if (result) {
    return res.status(200).send({
      success: true,
      data: {},
    });
  } else {
    return res.status(400).send({
      success: false,
      data: {},
      message: "server error",
    });
  }
});

router.get("/hot-main", async (req, res) => {
  return;
});

router.get("/hot-list", async (req, res) => {
  return;
});

router.post("/search", async (req, res) => {
  const { word } = req.body;
  const result = await boardService.searchBoard(word);

  if (result) {
    return res.status(200).send({
      success: true,
      data: result,
    });
  } else {
    return res.status(400).send({
      success: false,
      data: {},
      message: "server error",
    });
  }
});

module.exports = router;
