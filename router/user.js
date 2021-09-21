const express = require("express");
const app = express();
const router = express.Router();
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("../middleware");

router.post("/login", isNotLoggedIn, async (req, res, next) => {
  passport.authenticate("local-login", (err, user) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "존재하지 않는 아이디입니다.",
      });
    }
    if (!err && user) {
      req.logIn(user, (err) => {
        console.log(err);
        if (err) {
          return res.status(400).json(err);
        }
        return res.json({
          success: true,
        });
      });
    }
  })(req, res, next);
});

router.post("/join", isNotLoggedIn, async (req, res, next) => {
  passport.authenticate("local-join", (err, user) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: "이미 가입된 아이디입니다." });
    }
    return res.status(200).send({ success: true });
  })(req, res, next);
});

router.get("/logout", async (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).json({
    logout: true,
  });
});

router.get("/test", (req, res) => {
  // return res.status(200).send({
  //   test: "ggod",
  //   result: req.user,
  // });
  return res.status(200).send({ message: true, user: req.user });
});

module.exports = router;
