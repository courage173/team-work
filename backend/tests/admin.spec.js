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
        id: 5,
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
})