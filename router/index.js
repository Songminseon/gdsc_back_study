const express = require("express");
const app = express();
const router = express.Router();
const user = require("./user");
const board = require("./board");
const like = require("./like");
const message = require("./message");

router.use("/user", user);
router.use("/board", board);
router.use("/like", like);
router.use("/message", message);

module.exports = router;
