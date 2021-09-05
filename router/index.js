const express = require("express");
const app = express();
const router = express.Router();
const user = require("./user");
const board = require("./board");

router.use("/user", user);
router.use("/board", board);

module.exports = router;
