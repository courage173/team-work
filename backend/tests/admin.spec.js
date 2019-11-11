import chaiHttp from 'chai-http';
import { exec } from 'child_process';
import app from '../app';
import chai from 'chai';

import users from '../models/users'


chai.use(chaiHttp)
const { expect } = chai;


describe("create new user", ()=>{
  before((done) => {
    const dump = 'psql -h localhost -d testDb -U postgres -f backend/tests/testDb.sql';
    exec(dump, (err) => {
      done();
    });
  });
  

  describe("Post successfull api/v1/auth/create-user",()=>{
    it("return signup successfull", (done)=>{
      chai.request(app)
      .post("/api/v1/auth/create-user")
      .set("Accept", "application/json")
      .send({
        id: 2,
        first_name: "kola",
        last_name: "wole",
        email: "courageosemwengie@gmail.com",
        password: "pedro123",
        is_admin: true
      })
      .end((err,res)=>{
        console.log(res.body)
        expect(res.body).to.be.an('object')
        expect(res.body.status).to.equal('success')
        
        expect(res.body.data.is_admin).to.equal(true);
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.first_name).to.equal('kola');
        expect(res.body.data.last_name).to.equal('wole');
        expect(res.body.data.email).to.equal('courageosemwengie@gmail.com');
        
        done();
      })
    })
  })
  describe('POST email already in use api/v1/auth/signup', () => {
    it('should return user with this email already exist', (done) => {
      chai.request(app)
        .post('/api/v1/auth/create-user')
        .set('Accept', 'application/json')
        .send({
          id: 15,
          email: 'bosky@gmail.com',
          first_name: 'faith',
          last_name: 'osemwengie',
          password: 'developer',
          is_admin: true
        })
        .end((err, res) => {
          
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(409);
          expect(res.body.message).to.equal('this email is already in use');
          done();
        });
    });
  });

  describe('POST should return email is invalid api/v1/auth/create-user', () => {
    it('should return error when email is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/create-user')
        .set('Accept', 'application/json')
        .send(users[3])
        .end((err, res) => {
          const {
            email
          } = res.body.errors;
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(email[0]).to.equal('the email format is invalid');
          done();
        });
    });
  });

  describe('POST should return password length is less than 6 or invalid api/v1/auth/create-user', () => {
    it('should return error when password length is less than 6 or invalid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/create-user')
        .set('Accept', 'application/json')
        .send(users[4])
        .end((err, res) => {
          const {
            password
          } = res.body.errors;
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(password[0]).to.equal('Min password limit is 6');
          done();
        });
    });
  });


})