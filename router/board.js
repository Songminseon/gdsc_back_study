const express = require("express");
const app = express();
const router = express.Router();

const boardService = require("../services/board");

router.get("/:category", async (req, res) => {
  const category = req.params.category;
  let result;

  if (category === "7") {
    result = await boardService.getHotBoard((isLimit = false));
  } else {
    result = await boardService.getBoardByCategory(category);
  }

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
  const isSecret = result.is_secret;

  if (isSecret) {
    result.User.nickname = "익명";
  }

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

router.get("/main/myboard", async (req, res) => {
  const result = await boardService.getMainBoard();
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

router.get("/main/hot", async (req, res) => {
  const result = await boardService.getHotBoard((isLimit = true));
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

router.get("/main/realtime", async (req, res) => {
  const result = await boardService.getRealtimeBoard();

  for (let i = 0; i < result.length; i++) {
    const isSecret = result[i].is_secret;
    if (isSecret) {
      result[i].nickname = "익명";
    }
  }

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

  for (let i = 0; i < result.length; i++) {
    if (result[i].is_secret) {
      result[i].User.nickname = "익명";
    }
  }

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

router.post("/search", async (req, res) => {
  const { word } = req.body;
  const result = await boardService.searchBoard(word);

  for (let i = 0; i < result.length; i++) {
    const isSecret = result[i].is_secret;
    if (isSecret) {
      result[i].User.nickname = "익명";
    }
  }
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
