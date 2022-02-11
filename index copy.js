const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const morgan = require('morgan');
const { user } = require('./config/database');
const getConnection = require('./config/db');
const bodyParser = require('body-parser');

const app = express();
/*
    var: 변수 중복이 가능(잘 안씀)
    const: 중복 불가, 선언과 초기화를 동시에 진행(재할당 불가)
    let: 중복 불가, 재할당 가능
*/

let users;
getConnection((conn) => {
    conn.query("select * from testtable", (error, rows) => {
        if(error) throw error; // not connected
        console.log("DB User: ");
        console.log(rows);
        users = rows;
    });
    conn.release(); // pool 반환
});

// 미들웨어
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


app.get('/users', (req, res) => {
    req.query.limit = req.query.limit || 10; // limit이 null이면 10을 넣음
    const limit = parseInt(req.query.limit, 10); // 10진수 정수로 변경
    if( Number.isNaN(limit) ){
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
});

app.get('/users/:id', function(req, res){
    const id = parseInt(req.params.id, 10);
    if( Number.isNaN(id) ) return res.status(400).end();

    const user = users.filter((user)=> user.id === id)[0];
    if( !user ) return res.status(404).end();

    res.json(user);
})

app.delete('/users/:id', (req, res)=>{
    const id = parseInt(req.params.id, 10);
    if( Number.isNaN(id) ) return res.status(400).end();

    users = users.filter(user=> user.id != id);
    res.status(204).end();
})

app.post('/users', (req, res)=>{
    // npm install body-parser --save 설치
    const name = req.body.name;
    if( !name ) return res.status(400).end();

    const isConflict = users.filter(user => user.name === name ).length
    if( isConflict ) return res.status(409).end();

    const id = Date.now();
    const user = {id: name};
    users.push(user);
    res.status(201).json(user);
})

app.put('/users/:id', (req, res)=>{
    const id = parseInt(req.params.id, 10);
    if( Number.isNaN(id) ) return res.status(400).end();

    const name = req.body.name;
    if( !name ) return res.status(400).end();

    const isConflict = users.filter(user=> user.name === name).length;
    if( isConflict ) return res.status(409).end();
    
    const user = users.filter(user => user.id === id)[0];
    if( !user ) return res.status(404).end();
    

    user.name = name;

    res.json(user);
})



app.listen(3000, function(){
    console.log('Server is running');
});

module.exports = app;