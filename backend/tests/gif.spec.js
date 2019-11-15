import chaiHttp from 'chai-http';
import { exec } from 'child_process';
import app from '../app';
import chai from 'chai';
import users from '../models/users';


chai.use(chaiHttp)
const { expect } = chai;

let token;
let id;
const idd = `/api/v1/auth/delete-gifs/${id}`.toString()

describe("testing for gifs Post/Delete/Get", ()=>{
    beforeEach((done) => {
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

              done();
            }
            
            
            token = res.body.data.token
            console.log(token)
            
            
            
    
            done();
          })

      })
        it("it should return successfull",(done)=>{
          chai.request(app)
          .post('/api/v1/auth/gifs')
          .set("Authorization", "Bearer " + token)
          .field({
              title: "new pic",
              flagged: true,
              
          })
          .attach('image', './backend/pic.png')
          .end((err,res)=>{
            console.log(err)
            console.log(res.body.status)
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.equal('success');
              expect(res.body.data.gif_url).to.be.a('string')
              expect(res.body.data.title).to.be.a('string');
              id = res.body.data.gif_id
              
              done();
          })
        })
        
        describe("to delete a gif '/api/v1/auth/delete-gifs/${id}",()=>{
          it("should delete gif successfully", (done)=>{
            chai.request(app)
            .delete(`/api/v1/auth/delete-gifs/${id}`)
            .set("Authorization", "Bearer " + token)
            .end((err,res)=>{
              expect(res.body.status).to.equal('success')
              expect(res.body.data.message).to.be.a('string')
              
              done()
            })
          })
        })

      })
      
    
    
})  
