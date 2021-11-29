const express = require("express");
const app = express();
const router = express.Router();
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("../middleware");
const userService = require("../services/user");

router.get("/", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(200).send({
      success: false,
      data: {},
    });
  } else {
    const result = await userService.getUser(req.user.id);
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
  }
});

router.post("/", isNotLoggedIn, async (req, res, next) => {
  passport.authenticate("local-join", (err, user) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!user) {
      return res.status(200).send({ success: false, message: "이미 가입된 아이디입니다." });
    }
    return res.status(200).send({ success: true });
  })(req, res, next);
});

router.put("/", isLoggedIn, async (req, res) => {
  const { nickname } = req.body;

  const result = await userService.updateUser(req.user.id, nickname);

  if (result) {
    return res.status(200).send({ sucess: true, data: result });
  } else {
    return res.status(400).send({
      success: false,
      data: {},
      message: "server error",
    });
  }
});

router.delete("/", isLoggedIn, async (req, res) => {
  const result = await userService.deleteUser(req.user.id);

  if (result) {
    return res.status(200).send({
      sucess: true,
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

router.post("/login", isNotLoggedIn, async (req, res, next) => {
  passport.authenticate("local-login", (err, user) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "존재하지 않는 아이디입니다.",
      });
    }
    if (!err && user) {
      req.logIn(user, (err) => {
        if (err) {
          return res.status(400).json(err);
        }
        return res.status(200).send({
          success: true,
          data: {},
        });
      });
    }
  })(req, res, next);
});

router.get("/logout", isLoggedIn, async (req, res) => {
  req.logout();
  req.session.destroy();
  return res.status(200).json({
    success: true,
    data: {},
  });
});

router.post("/email", async (req, res) => {
  const { email } = req.body;

  const result = userService.uploadEmail(email, req.user.id);
  if (result) {
    return res.status(200).send({
      success: true,
      data: {},
    });
  } else {
    return res.status(400).send({
      success: false,
      data: {},
    });
  }
});

router.get("/email/auth", async (req, res) => {
  const authCode = req.query.code;
  const result = await userService.authEmail(authCode);
  if (result) {
    return res.send("<div>인증이 완료 되었습니다.</div>");
  } else {
    return res.send("<div>유효하지 않은 코드입니다.</div>");
  }
});

router.get("/test", async (req, res) => {
  return res.status(200).send({
    success: false,
    data: {},
    message: "server error",
  });
});

module.exports = router;
