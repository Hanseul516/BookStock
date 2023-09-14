var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(session({
    cookie: { maxAge: 1000*60*60*2 },
    secret: 'sometext', // 세션 데이터 암호화를 위한 비밀 키 (보안 목적)
    rolling: true,  // 매 응답마다 쿠키 시간 초기화
    resave: false,  // 세션값이 수정되지 않으면 서버에 다시 저장하지 않음
    saveUninitialized: true,   // 초기화되지 않은 세션도 저장할지 여부
}));  // req.session 속성을 만들어서 세션 객체를 저장

app.use(cors());
app.use('/api', indexRouter);

// 404 에러 처리
app.use((req, res, next) => {
    console.error(404, req.url);
    res.json({error: {message: '존재하지 않는 API입니다.'}});
});

// 500 에러 처리
app.use((err, req, res, next) => {
    console.error(err.stack);
    console.error(err.cause);
    res.json({error: {message: '요청을 처리할 수 없습니다. 잠시 후 다시 요청해 주세요.'}});
});

module.exports = app;
