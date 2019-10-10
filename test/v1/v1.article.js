
import chai from 'chai'
import chaiHttp from 'chai-http'
import supertest from 'supertest'
import app from '../app.js'
import data from './data/mochaData'

chai.use(chaiHttp);
chai.should();
chai.expect();

const { article } = data

describe('Article', () => {
    describe('Create an article', () => {
        it('Employee should create an article', (done) => {
            supertest('http://localhost:8081/api/v1/')
                .post('/articles')
                .set('Accept', 'application/json')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiYmloaXJlIiwibGFzdE5hbWUiOiJib3JpcyIsImVtYWlsIjoibXVoaXJlYm9yaXNAeWFob28uZnIiLCJhZGRyZXNzIjoiYnJvIiwicGFzc3dvcmQiOiIkMmEkMDgkdFRwbVptY3dYLmR5TFA1MllFdFJuLjJjcXhmb1dDd2pjSVA2OXV5ZHhVaU11NllmL0huQ20iLCJnZW5kZXIiOiJvdGhlciIsImpvYlJvbGUiOiJhc3Npc3N0ZW50IiwiZGVwYXJ0bWVudCI6ImVsZWN0cmljYWwiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY4OTYyMTU5fQ.4PvrlxZ4v3bj5sXzVM21A02D-zoBo_BzyUQfb3DgBMI')
                .send(article)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.a('object');
                    done();
                });
        });
    });
})