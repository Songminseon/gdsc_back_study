const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models/index");
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "user_id",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, user_id, password, done) => {
        user_id = user_id.trim();
        try {
          const user = await User.findOne({ where: { user_id } });
          if (user) {
            const result = await bcrypt.compare(password, user.password);
            if (result) {
              done(null, user);
            } else {
              done(null, false, { message: "비밀번호 불일치" });
            }
          } else {
            done(null, false, { message: "없는 유저 입니다." });
          }
        } catch (err) {
          console.log(err);
          done(err);
        }
      }
    )
  );

  passport.use(
    "local-join",
    new LocalStrategy(
      {
        usernameField: "user_id",
        password: "password",
        passReqToCallback: true,
      },

      async (req, user_id, password, done) => {
        user_id = user_id.trim();
        try {
          let user = await User.findOne({
            where: { user_id },
          });
          if (user) {
            //이미 가입된 유저
            return done(null, false);
          }

          const hash = await bcrypt.hash(password, 12);
          const { email, name, nickname, major } = req.body;
          user = await User.create({
            user_id: user_id,
            password: hash,
            email: email,
            name: name,
            nickname: nickname,
            major: major,
          });
          return done(null, user);
        } catch (err) {
          console.log(err);
          done(err);
        }
      }
    )
  );
};
