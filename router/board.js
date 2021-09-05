const express = require("express");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).send({ test: "good" });
});

module.exports = router;
