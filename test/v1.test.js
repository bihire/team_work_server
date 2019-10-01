
import chai from 'chai'
import chaiHttp from 'chai-http'
import supertest from 'supertest'
import app from '../app.js'

chai.use(chaiHttp);
chai.should();
chai.expect();

describe('User', () => {
    describe('Signup', () => {
        it('Employee should signup', (done) => {
            supertest('http://localhost:8081/api/v1')
                .post('/auth/signup')
                .set('Accept', 'application/json')
                .send({
                    "firstName": " bihire",
                    "lastName": "boris",
                    "email": "muhireg@yahoo.fr",
                    "password": "bobo1234",
                    "confirmPassword": "bobo1234",
                    "gender": "other",
                    "jobRole": "assisstent",
                    "department": "electrical",
                    "address": "bro",
                    "isAdmin": true
                })
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.a('object');
                    done();
                });
        });
    });

    describe('Login', () => {
        it('Employee should check if user exist', (done) => {
            supertest('http://localhost:8081/api/v1')
                .post('/auth/signin')
                .set('Accept', 'application/json')
                .send({
                    "email": "muhire@yahoo.fr",
                    "password": "bobo1234"
                })
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    done();
                });
        });
    });
});

describe('Article', () => {
    describe('Create an article', () => {
        it('Employee should create an article', (done) => {
            supertest('http://localhost:8081/api/v1/')
                .post('/articles')
                .set('Accept', 'application/json')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiYmloaXJlIiwibGFzdE5hbWUiOiJib3JpcyIsImVtYWlsIjoibXVoaXJlYm9yaXNAeWFob28uZnIiLCJhZGRyZXNzIjoiYnJvIiwicGFzc3dvcmQiOiIkMmEkMDgkdFRwbVptY3dYLmR5TFA1MllFdFJuLjJjcXhmb1dDd2pjSVA2OXV5ZHhVaU11NllmL0huQ20iLCJnZW5kZXIiOiJvdGhlciIsImpvYlJvbGUiOiJhc3Npc3N0ZW50IiwiZGVwYXJ0bWVudCI6ImVsZWN0cmljYWwiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY4OTYyMTU5fQ.4PvrlxZ4v3bj5sXzVM21A02D-zoBo_BzyUQfb3DgBMI')
                .send({
                    "title": "article  ",
                    "article": "  DeprecationWarning Unhandled promise rejections are deprecated In the future promise rejections that are not handled will terminate the Nodejs process with a nonzero exit code",
                    "category": ["kdgndk ", "network  ", "tenh", "fives", "nines"]
                })
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.a('object');
                    done();
                });
        });
    });
    describe('Update an article', () => {
        it('Employee should update their own article', (done) => {
            supertest('http://localhost:8081/api/v1')
                .patch('/articles/1')
                .set('Accept', 'application/json')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiYmloaXJlIiwibGFzdE5hbWUiOiJib3JpcyIsImVtYWlsIjoibXVoaXJlYm9yaXNAeWFob28uZnIiLCJhZGRyZXNzIjoiYnJvIiwicGFzc3dvcmQiOiIkMmEkMDgkdFRwbVptY3dYLmR5TFA1MllFdFJuLjJjcXhmb1dDd2pjSVA2OXV5ZHhVaU11NllmL0huQ20iLCJnZW5kZXIiOiJvdGhlciIsImpvYlJvbGUiOiJhc3Npc3N0ZW50IiwiZGVwYXJ0bWVudCI6ImVsZWN0cmljYWwiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY4OTYyMTU5fQ.4PvrlxZ4v3bj5sXzVM21A02D-zoBo_BzyUQfb3DgBMI')
                .send({

                    "title": "brodfg  ",
                    "article": "  DeprecationWarning Unhandled promise rejections are deprecated In the future promise rejections that are not handled will terminate the Nodejs process with a nonzero exit code"
                })
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    done();
                });
        });
    });

    describe('Get an article', () => {
        it('Employee should get an article information', (done) => {
            supertest('http://localhost:8081/api/v1')
                .get('/articles/1')
                .set('Accept', 'application/json')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiYmloaXJlIiwibGFzdE5hbWUiOiJib3JpcyIsImVtYWlsIjoibXVoaXJlYm9yaXNAeWFob28uZnIiLCJhZGRyZXNzIjoiYnJvIiwicGFzc3dvcmQiOiIkMmEkMDgkdFRwbVptY3dYLmR5TFA1MllFdFJuLjJjcXhmb1dDd2pjSVA2OXV5ZHhVaU11NllmL0huQ20iLCJnZW5kZXIiOiJvdGhlciIsImpvYlJvbGUiOiJhc3Npc3N0ZW50IiwiZGVwYXJ0bWVudCI6ImVsZWN0cmljYWwiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY4OTYyMTU5fQ.4PvrlxZ4v3bj5sXzVM21A02D-zoBo_BzyUQfb3DgBMI')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    done();
                });
        });
    });

    describe('Get all articles', () => {
        it('Employee should get all the articles', (done) => {
            supertest('http://localhost:8081/api/v1')
                .get('/feeds')
                .set('Accept', 'application/json')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiYmloaXJlIiwibGFzdE5hbWUiOiJib3JpcyIsImVtYWlsIjoibXVoaXJlYm9yaXNAeWFob28uZnIiLCJhZGRyZXNzIjoiYnJvIiwicGFzc3dvcmQiOiIkMmEkMDgkdFRwbVptY3dYLmR5TFA1MllFdFJuLjJjcXhmb1dDd2pjSVA2OXV5ZHhVaU11NllmL0huQ20iLCJnZW5kZXIiOiJvdGhlciIsImpvYlJvbGUiOiJhc3Npc3N0ZW50IiwiZGVwYXJ0bWVudCI6ImVsZWN0cmljYWwiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY4OTYyMTU5fQ.4PvrlxZ4v3bj5sXzVM21A02D-zoBo_BzyUQfb3DgBMI')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    done();
                });
        });
    });

    describe('Get own articles', () => {
        it('Employee should get all their own articles', (done) => {
            supertest('http://localhost:8081/api/v1')
                .get('/my_articles')
                .set('Accept', 'application/json')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiYmloaXJlIiwibGFzdE5hbWUiOiJib3JpcyIsImVtYWlsIjoibXVoaXJlYm9yaXNAeWFob28uZnIiLCJhZGRyZXNzIjoiYnJvIiwicGFzc3dvcmQiOiIkMmEkMDgkdFRwbVptY3dYLmR5TFA1MllFdFJuLjJjcXhmb1dDd2pjSVA2OXV5ZHhVaU11NllmL0huQ20iLCJnZW5kZXIiOiJvdGhlciIsImpvYlJvbGUiOiJhc3Npc3N0ZW50IiwiZGVwYXJ0bWVudCI6ImVsZWN0cmljYWwiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY4OTYyMTU5fQ.4PvrlxZ4v3bj5sXzVM21A02D-zoBo_BzyUQfb3DgBMI')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    done();
                });
        });
    });

    describe('Get author articles', () => {
        it('Employee should get other author all articles', (done) => {
            supertest('http://localhost:8081/api/v1')
                .get('/user/1')
                .set('Accept', 'application/json')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiYmloaXJlIiwibGFzdE5hbWUiOiJib3JpcyIsImVtYWlsIjoibXVoaXJlYm9yaXNAeWFob28uZnIiLCJhZGRyZXNzIjoiYnJvIiwicGFzc3dvcmQiOiIkMmEkMDgkdFRwbVptY3dYLmR5TFA1MllFdFJuLjJjcXhmb1dDd2pjSVA2OXV5ZHhVaU11NllmL0huQ20iLCJnZW5kZXIiOiJvdGhlciIsImpvYlJvbGUiOiJhc3Npc3N0ZW50IiwiZGVwYXJ0bWVudCI6ImVsZWN0cmljYWwiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY4OTYyMTU5fQ.4PvrlxZ4v3bj5sXzVM21A02D-zoBo_BzyUQfb3DgBMI')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    done();
                });
        });
    });

    describe('Delete an article', () => {
        it('Employee should delete their own article', (done) => {
            supertest('http://localhost:8081/api/v1')
                .delete('/articles/1')
                .set('Accept', 'application/json')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiYmloaXJlIiwibGFzdE5hbWUiOiJib3JpcyIsImVtYWlsIjoibXVoaXJlYm9yaXNAeWFob28uZnIiLCJhZGRyZXNzIjoiYnJvIiwicGFzc3dvcmQiOiIkMmEkMDgkdFRwbVptY3dYLmR5TFA1MllFdFJuLjJjcXhmb1dDd2pjSVA2OXV5ZHhVaU11NllmL0huQ20iLCJnZW5kZXIiOiJvdGhlciIsImpvYlJvbGUiOiJhc3Npc3N0ZW50IiwiZGVwYXJ0bWVudCI6ImVsZWN0cmljYWwiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY4OTYyMTU5fQ.4PvrlxZ4v3bj5sXzVM21A02D-zoBo_BzyUQfb3DgBMI')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    done();
                });
        });
    });
});

describe('Comment', () => {
    describe('Create comment', () => {
        it('Employee should create a comment', (done) => {
            supertest('http://localhost:8081/api/v1/')
                .post('/articles/2/comments')
                .set('Accept', 'application/json')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiYmloaXJlIiwibGFzdE5hbWUiOiJib3JpcyIsImVtYWlsIjoibXVoaXJlYm9yaUB5YWhvby5mciIsImFkZHJlc3MiOiJicm8iLCJwYXNzd29yZCI6IiQyYSQwOCRseHptYU1CMjE2UHZiZ2hHSm1Qc3hlSzlsYXpPd0NDZ2s0VjFaR0I3ZHR4eGtZWW14MDMxQyIsImdlbmRlciI6Im90aGVyIiwiam9iUm9sZSI6ImFzc2lzc3RlbnQiLCJkZXBhcnRtZW50IjoiZWxlY3RyaWNhbCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE1Njk0NTUyNTF9.JPIzWa6757ltcnFFVLegZDPhcbJd5Ebe99Q_XDkEl2g')
                .send({
                    comment: "bro this article sucks like aaaaahhh   "
                })
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.a('object');
                    done();
                });
        });
    });
});


describe('Flag', () => {
    describe('Create article flag', () => {
        it('Employee should flag an article', (done) => {
            supertest('http://localhost:8081/api/v1/')
                .post('/flags/2/articles')
                .set('Accept', 'application/json')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiYmloaXJlIiwibGFzdE5hbWUiOiJib3JpcyIsImVtYWlsIjoibXVoaXJlYm9yaUB5YWhvby5mciIsImFkZHJlc3MiOiJicm8iLCJwYXNzd29yZCI6IiQyYSQwOCRseHptYU1CMjE2UHZiZ2hHSm1Qc3hlSzlsYXpPd0NDZ2s0VjFaR0I3ZHR4eGtZWW14MDMxQyIsImdlbmRlciI6Im90aGVyIiwiam9iUm9sZSI6ImFzc2lzc3RlbnQiLCJkZXBhcnRtZW50IjoiZWxlY3RyaWNhbCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE1Njk0NTUyNTF9.JPIzWa6757ltcnFFVLegZDPhcbJd5Ebe99Q_XDkEl2g')
                .send({
                    articleFlag: "hgihasbvfjo adgyuagdbij augsdhu9sbaqu "
                })
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.a('object');
                    done();
                });
        });
    });
    describe('Create comment flag', () => {
        it('Employee should flag a comment', (done) => {
            supertest('http://localhost:8081/api/v1/')
                .post('/flags/1/comments')
                .set('Accept', 'application/json')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiYmloaXJlIiwibGFzdE5hbWUiOiJib3JpcyIsImVtYWlsIjoibXVoaXJlYm9yaXNAeWFob28uZnIiLCJhZGRyZXNzIjoiYnJvIiwicGFzc3dvcmQiOiIkMmEkMDgkdFRwbVptY3dYLmR5TFA1MllFdFJuLjJjcXhmb1dDd2pjSVA2OXV5ZHhVaU11NllmL0huQ20iLCJnZW5kZXIiOiJvdGhlciIsImpvYlJvbGUiOiJhc3Npc3N0ZW50IiwiZGVwYXJ0bWVudCI6ImVsZWN0cmljYWwiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY4OTYyMTU5fQ.4PvrlxZ4v3bj5sXzVM21A02D-zoBo_BzyUQfb3DgBMI')
                .send({
                    commentFlag: "gvuyhsadvfj sdjfbuasb afsughua90bvc "
                })
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.a('object');
                    done();
                });
        });
    });
});
// ---------------- Admin -------------------

describe('Admin', () => {
    describe('Get all flagged articles', () => {
        it('Admin should Get all flagged articles', (done) => {
            supertest('http://localhost:8081/api/v1')
                .get('/admin/articles')
                .set('Accept', 'application/json')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiYmloaXJlIiwibGFzdE5hbWUiOiJib3JpcyIsImVtYWlsIjoibXVoaXJlQHlhaG9vLmZyIiwiYWRkcmVzcyI6ImJybyIsInBhc3N3b3JkIjoiJDJhJDA4JHBjL09pRUN4VGFOR3lrRjBOWHhBeHV4alJSRGk3bnU2dTdMWE5tTlBoS3FFZDg4QTR6MW5LIiwiZ2VuZGVyIjoib3RoZXIiLCJqb2JSb2xlIjoiYXNzaXNzdGVudCIsImRlcGFydG1lbnQiOiJlbGVjdHJpY2FsIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTY5NjEyMDQzfQ.uTp0HYkncArCgUIyrhJAoK8NHZKZf8Mgj7HtCddSi4c')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    done();
                });
        });
    });
    describe('Get all flagged comments', () => {
        it('Admin should Get all flagged comments', (done) => {
            supertest('http://localhost:8081/api/v1')
                .get('/admin/comments')
                .set('Accept', 'application/json')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiYmloaXJlIiwibGFzdE5hbWUiOiJib3JpcyIsImVtYWlsIjoibXVoaXJlQHlhaG9vLmZyIiwiYWRkcmVzcyI6ImJybyIsInBhc3N3b3JkIjoiJDJhJDA4JHBjL09pRUN4VGFOR3lrRjBOWHhBeHV4alJSRGk3bnU2dTdMWE5tTlBoS3FFZDg4QTR6MW5LIiwiZ2VuZGVyIjoib3RoZXIiLCJqb2JSb2xlIjoiYXNzaXNzdGVudCIsImRlcGFydG1lbnQiOiJlbGVjdHJpY2FsIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTY5NjEyMDQzfQ.uTp0HYkncArCgUIyrhJAoK8NHZKZf8Mgj7HtCddSi4c')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    done();
                });
        });
    });
    describe('Ignore flagged article', () => {
        it('Admin should ignore a flagged article', (done) => {
            supertest('http://localhost:8081/api/v1')
                .delete('/admin/2/ignore/articles')
                .set('Accept', 'application/json')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiYmloaXJlIiwibGFzdE5hbWUiOiJib3JpcyIsImVtYWlsIjoibXVoaXJlQHlhaG9vLmZyIiwiYWRkcmVzcyI6ImJybyIsInBhc3N3b3JkIjoiJDJhJDA4JHBjL09pRUN4VGFOR3lrRjBOWHhBeHV4alJSRGk3bnU2dTdMWE5tTlBoS3FFZDg4QTR6MW5LIiwiZ2VuZGVyIjoib3RoZXIiLCJqb2JSb2xlIjoiYXNzaXNzdGVudCIsImRlcGFydG1lbnQiOiJlbGVjdHJpY2FsIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTY5NjEyMDQzfQ.uTp0HYkncArCgUIyrhJAoK8NHZKZf8Mgj7HtCddSi4c')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(204);
                    res.should.be.a('object');
                    done();
                });
        });
    });
    describe('Ignore flagged comment', () => {
        it('Admin should ignore a flagged comment', (done) => {
            supertest('http://localhost:8081/api/v1')
                .delete('/admin/2/ignore/comments')
                .set('Accept', 'application/json')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiYmloaXJlIiwibGFzdE5hbWUiOiJib3JpcyIsImVtYWlsIjoibXVoaXJlQHlhaG9vLmZyIiwiYWRkcmVzcyI6ImJybyIsInBhc3N3b3JkIjoiJDJhJDA4JHBjL09pRUN4VGFOR3lrRjBOWHhBeHV4alJSRGk3bnU2dTdMWE5tTlBoS3FFZDg4QTR6MW5LIiwiZ2VuZGVyIjoib3RoZXIiLCJqb2JSb2xlIjoiYXNzaXNzdGVudCIsImRlcGFydG1lbnQiOiJlbGVjdHJpY2FsIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTY5NjEyMDQzfQ.uTp0HYkncArCgUIyrhJAoK8NHZKZf8Mgj7HtCddSi4c')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    done();
                });
        });
    });
    describe('Delete a flagged comment', () => {
        it('Admin should delete a flagged comment', (done) => {
            supertest('http://localhost:8081/api/v1')
                .delete('/admin/1/delete/comments')
                .set('Accept', 'application/json')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiYmloaXJlIiwibGFzdE5hbWUiOiJib3JpcyIsImVtYWlsIjoibXVoaXJlQHlhaG9vLmZyIiwiYWRkcmVzcyI6ImJybyIsInBhc3N3b3JkIjoiJDJhJDA4JHBjL09pRUN4VGFOR3lrRjBOWHhBeHV4alJSRGk3bnU2dTdMWE5tTlBoS3FFZDg4QTR6MW5LIiwiZ2VuZGVyIjoib3RoZXIiLCJqb2JSb2xlIjoiYXNzaXNzdGVudCIsImRlcGFydG1lbnQiOiJlbGVjdHJpY2FsIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTY5NjEyMDQzfQ.uTp0HYkncArCgUIyrhJAoK8NHZKZf8Mgj7HtCddSi4c')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    done();
                });
        });
    });
    describe('Delete a flagged article', () => {
        it('Admin should delete a flagged article', (done) => {
            supertest('http://localhost:8081/api/v1')
                .delete('/admin/1/delete/articles')
                .set('Accept', 'application/json')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiYmloaXJlIiwibGFzdE5hbWUiOiJib3JpcyIsImVtYWlsIjoibXVoaXJlQHlhaG9vLmZyIiwiYWRkcmVzcyI6ImJybyIsInBhc3N3b3JkIjoiJDJhJDA4JHBjL09pRUN4VGFOR3lrRjBOWHhBeHV4alJSRGk3bnU2dTdMWE5tTlBoS3FFZDg4QTR6MW5LIiwiZ2VuZGVyIjoib3RoZXIiLCJqb2JSb2xlIjoiYXNzaXNzdGVudCIsImRlcGFydG1lbnQiOiJlbGVjdHJpY2FsIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTY5NjEyMDQzfQ.uTp0HYkncArCgUIyrhJAoK8NHZKZf8Mgj7HtCddSi4c')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    done();
                });
        });
    });
});