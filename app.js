const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const router = require('./router/index');;
const path = require('path');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
// 보안 관련
// const morgan = require('morgan');
// const session = require('cookie-session');
// const helmet = require('helmet');
// const hpp = require('hpp') 

//body parsing관련 부분
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use('/', indexRouter)
app.use('/user', userRouter)

// const sessionOption = {
//     resave:false,
//     saveUninitialized:false,
//     secret:process.env.COOKIE_SECRET,
//     cookie:{
//         httpOnly:true,
//         secure:false,
//     },
// };

// 배포 과정
// if(process.env.NODE_ENV === 'production') {
//     app.use(morgan('combined')); //record more records related to user experience
//     app.use(helmet());
//     app.use(hpp());
// } else {
//     app.use(morgan('dev')); //development mode
// }

