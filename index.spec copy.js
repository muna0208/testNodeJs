const request = require('supertest');
const shoule = require('should');

const app = require('./index');

describe('GET /users는', ()=>{
    describe('성공시', ()=>{
        it('유저 객체를 담은 배열로 응답한', (done)=>{  // 비동기 처리를 위해 done 
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();

                })
        })
        it('최대 limit 갯수만큼 응답한다.', (done)=>{  // 비동기 처리를 위해 done 
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2)
                    done();                    
                })
        })
    })
    describe('실패시', ()=>{
        it('limit이 숫자형이 아니면 400을 응답한다.', (done) =>{
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
                // .end((err, res) => {
                //     done();
                // })
        });
    });    
});

describe('GET /users/:id는', ()=>{
    describe('성공시', ()=>{
        it('id가 1인 유저 객체를 반환한다.', (done)=>{
            request(app)
                .get('/users/1')
                .end((err, res)=>{
                    res.body.should.have.property('id',1);
                    done();
                })
        });
    });
    describe('실패시', ()=>{
        it('id가 숫자가 아닐경우 400으로 응답한다.', (done)=>{
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        });
        it('id로 유저를 찾을 수 없을 경우 404로 응답한다.', (done)=>{
            request(app)
                .get('/users/99')
                .expect(404)
                .end(done);
        });
    });
});

describe('DELETE /user/1', ()=>{
    describe('성공시', ()=>{
        it('204를 응답한다.', (done)=>{
            request(app)
                .delete('/users/1')
                .expect(204) // 204를 체크한다.
                .end(done);
        })
    })
    describe('실패시', ()=>{
        it('id가 숫자가 아닐경우 400으로 응답한다.', (done)=>{
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        })
    })
})

describe('POST /users', ()=>{
    describe('성공시', ()=>{
        let name='김정식', body;
        before(done=>{
            request(app)
                .post('/users')
                .send({ name})
                // .send({ name: name}) 위와 같다 
                .expect(201)
                .end((err, res)=>{
                    body = res.body;
                    done();
                });
        })
        it('생성도니 유저 객체를 반환한다.', ()=>{
            body.should.have.property('id', name);
        })
    })
    describe('실패시', ()=>{
        it('name 파라미터 누락시 404를 반환한다.', (done)=>{
            request(app)
                .post('/users')
                .send()
                .expect(400)
                .end(done);
        })
        it('name이 중복일 경우 409를 반환한다.', done=>{
            request(app)
                .post('/users')
                .send({ name: '윤동호'})
                .expect(409)
                .end(done);
        })
    })
})

describe('POST /users', ()=>{
    describe('성공시', ()=>{
        let name='김정식', body;
        before(done=>{
            request(app)
                .post('/users')
                .send({ name})
                // .send({ name: name}) 위와 같다 
                .expect(201)
                .end((err, res)=>{
                    body = res.body;
                    done();
                });
        })
        it('생성도니 유저 객체를 반환한다.', ()=>{
            body.should.have.property('id', name);
        })
    })
    describe('실패시', ()=>{
        it('name 파라미터 누락시 404를 반환한다.', (done)=>{
            request(app)
                .post('/users')
                .send()
                .expect(400)
                .end(done);
        })
        it('name이 중복일 경우 409를 반환한다.', done=>{
            request(app)
                .post('/users')
                .send({ name: '윤동호'})
                .expect(409)
                .end(done);
        })
    })
})

describe('PUT /users/:id', ()=>{
    describe('성공시', ()=>{
        it('변경된 name을 응답한다.', (done)=>{
            request(app)
                .put('/users/3')
                .send({ name: '김정식'})
                .end((err, res)=>{
                    res.body.should.have.property('name', '김정식');
                    done();
                })
        })
    })
    describe('실패시', ()=>{
        it('정수가 아닌 id일 경우 400을 응답한다.', (done)=>{
            request(app)
                .put('/users/one')
                .expect(400)
                .end(done);
        })
        it('name이 없을 경우 400을 응답한다.', (done)=>{
            request(app)
                .put('/users/one')
                .expect(400)
                .end(done);
        })
        it('없는 유저일 경우 404를 응답한다.', (done)=>{
            request(app)
                .put('/users/999')
                .send({name: '서동욱'})
                .expect(404)
                .end(done);
        })
        it('이름이 중복일 경우 409를 응답한다.', (done)=>{
            request(app)
                .put('/users/3')
                .send({name: '김정식'})
                .expect(409)
                .end(done);
        })
    })
})