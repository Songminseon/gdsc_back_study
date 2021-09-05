const express = require("express");
const app = express();
const router = express.Router();

router.get("/test", (req, res) => {
  return res.status(200).send({ test: "good" });
});

module.exports = router;
