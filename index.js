const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const user = require('./api/user'); // ./api/user/index.js에서 index.js는 생략 가능


/*
    var: 변수 중복이 가능(잘 안씀)
    const: 중복 불가, 선언과 초기화를 동시에 진행(재할당 불가)
    let: 중복 불가, 재할당 가능
*/

// 미들웨어
if( process.env.NODE_ENV !== 'test' ){
    app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/users', user);

module.exports = app;