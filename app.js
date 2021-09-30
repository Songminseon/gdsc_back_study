const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const path = require("path");
const session = require("cookie-session");
const passport = require("passport");

const router = require("./router/index");
const { sequelize } = require("./models");
const passportConfig = require("./passport");
// 보안 관련
// const morgan = require('morgan');
// const session = require('cookie-session');
// const helmet = require('helmet');
// const hpp = require('hpp')

app.listen(port, () => {
  console.log("server on");
  console.log(port, "port");
});

const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: "gdsc-secret",
  cookie: {
    httpOnly: true,
    secure: false,
  },
};

//body parsing관련 부분
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use(router);

router.use("/api", router);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("sequelize on");
  })
  .catch((err) => {
    console.log(err);
  });

console.log(process.env.NODE_ENV, "env test");

// 배포 과정
// if(process.env.NODE_ENV === 'production') {
//     app.use(morgan('combined')); //record more records related to user experience
//     app.use(helmet());
//     app.use(hpp());
// } else {
//     app.use(morgan('dev')); //development mode
// }
