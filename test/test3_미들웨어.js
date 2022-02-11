/*
    미들웨어 함수는 req(요청) 객체, res(응답) 객체, 그리고 어플리케이션 요청-응답 사이클 도중 그 다음의 미들웨어 함수에 대한 엑세스 권한을 갖는 함수이다.
    미들웨어란 간단하게 말하면 클라이언트에게 요청이 오고 그 요청을 보내기 위해 응답하려는 중간(미들)에 목적에 맞게 처리를 하는, 말하자면 거쳐가는 함수들이라고 보면 되겠다.

*/
const express = require('express');
const morgan = require('morgan');
const app = express();

function logger(req, res, next){
    console.log('i am logger');
    next(); // 반드시 호출해야 한다.
}

app.use(logger); // 미들웨어는 use를 사용한다.
app.use(morgan('dev')); // 결과 GET / 404 4.725 ms - 139

app.listen(3000, function(){
    console.log('Server is running');
})