import chaiHttp from 'chai-http';
import { exec } from 'child_process';
import app from '../app';
import chai from 'chai';
import users from '../models/users';


chai.use(chaiHttp)
const { expect } = chai;

let token;

describe("testing for gifs uploads", ()=>{
    before((done) => {
      done()
      
    });

    describe("Post should return sucesss api/v1/auth/gifs",()=>{
      it("should sign in first",(done)=>{
        chai.request(app)
          .post('/api/v1/auth/signin')
          .set('Accept', 'application/json')
          .send({
            email: "courageosemwengie@gmail.com",
            password: "pedro123"
          })
          .end((err,res)=>{
            if (err) {

              done(err)
            }
            
            
            token = res.body.data.token;
            
    
            done();
          })

      })
        it("it should return successfull",(done)=>{
          chai.request(app)
          .post('/api/v1/auth/gifs')
          .set("Authorization", token)
          .send({
              title: "new pic",
              flagged: true,
              
          })
          .end((err,res)=>{
            console.log(res.user)
            console.log(res.body.status)
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.equal('success');
              expect(res.body.data.gif).to.be.a('string')
              expect(res.body.data.title).to.be.a('string');
              done();
          })
        })
      })
      
    
    
})  
