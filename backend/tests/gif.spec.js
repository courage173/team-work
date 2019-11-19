// import chaiHttp from 'chai-http';
// import { exec } from 'child_process';
// import app from '../app';
// import chai from 'chai';
// import users from '../models/users';


// chai.use(chaiHttp)
// const { expect } = chai;

// let token;
// let id;


// describe("testing for gifs Post/Delete/Get", ()=>{
//     beforeEach((done) => {
//       done()
      
//     });

//     describe("Post should return sucesss/v1/gifs/gifs",()=>{
//       it("should sign in first",(done)=>{
//         chai.request(app)
//           .post('/v1/auth/signin')
//           .set('Accept', 'application/json')
//           .send({
//             email: "courageosemwengie@gmail.com",
//             password: "pedro123"
//           })
//           .end((err,res)=>{
            
            
//             token = res.body.data.token
            
            
            
            
    
//             done();
//           })

//       })
//         it("image post should return successfull",(done)=>{
//           chai.request(app)
//           .post('/v1/gifs/gifs')
//           .set("Authorization", "Bearer " + token)
//           .field({
//               title: "new pic",
//               flagged: true,
              
//           })
//           .attach('image', './backend/pic.png')
//           .end((err,res)=>{
//               expect(res.body).to.be.an('object');
//               expect(res.body.status).to.equal('success');
//               expect(res.body.data.imageUrl).to.be.a('string')
//               expect(res.body.data.title).to.be.a('string');
//               id = res.body.data.gifId
//               console.log(res.body.data.title)
              
//               done();
//           })
//         })
//         //get a particular gif
//         describe("to get a particular gif /v1/gifs/:id",()=>{
//           it("should successfully a particular all gifs",(done)=>{
//             chai.request(app)
//             .get(`/v1/gifs/${id}`)
//             .end((err,res)=>{
//               expect(res.body.status).to.equal('success')
//               expect(res.body.data).to.be.an('object')
//               done()
//             })
//           })
//         });

//         describe("it should reject invalid gifs /v1/gifs/all-gifs",()=>{
//           it("should successfully get all gifs",(done)=>{
//             chai.request(app)
//             .get("/v1/gifs/10")
//             .end((err,res)=>{
//               expect(res.body.status).to.equal('error')
//               expect(res.body.error).to.equal('cannot find gif of required id')
//               done()
//             })
//           })
//         })

//         /*get all gifs*/
//         describe("to get all gifs /v1/gifs/all-gifs",()=>{
//           it("should successfully get all gifs",(done)=>{
//             chai.request(app)
//             .get("/v1/gifs/all-gifs")
//             .end((err,res)=>{
//               expect(res.body.status).to.equal('success')
//               expect(res.body.data).to.be.an('array')
//               done()
//             })
//           })
//         })

//         //this are test for Gif comments

//         //posting a comment on a gif

//         describe("Post should return successful v1/gifs/<:gifId>/comment",()=>{
//           it("should return return post successfull",(done)=>{
//               chai.request(app)
//               .post(`/v1/gifs/${id}/comment`)
//               .set("Accept", "application/json")
//               .set("Authorization", "Bearer " + token)
//               .send({
//                   comment: "so who is winning the election",
//                   flagged: false
//               })
//               .end((err,res)=>{
//                 console.log(res.body.status)                  
//                 expect(res.body).to.be.an('object');
//                 expect(res.body.status).to.equal('success');
//                 expect(res.body.data.comment).to.be.a('string')
//                 done()
//               })
//           })
//       })
//       describe("Post should return invalid credentials v1/gifs/<:gifId>/comment",()=>{
//         it("should return return invalid credentials when no comment",(done)=>{
//             chai.request(app)
//             .post(`/v1/gifs/${id}/comment`)
//             .set("Accept", "application/json")
//             .set("Authorization", "Bearer " + token)
//             .send({
//                 flagged: false
//             })
//             .end((err,res)=>{
//                 expect(res.body).to.be.an('object');
//                 expect(res.body.message).to.equal('Invalid Credentials');
//                 expect(res.body.errors.comment).to.be.an('array')
//                 done()
//             })
//         })
//     })
        
//         //delete gif
        
//         describe("to delete a gif '/v1/gifs/delete-gifs/${id}",()=>{
//           it("should delete gif successfully", (done)=>{
//             chai.request(app)
//             .delete(`/v1/gifs/delete-gifs/${id}`)
//             .set("Authorization", "Bearer " + token)
//             .end((err,res)=>{
//               expect(res.body.status).to.equal('success')
//               expect(res.body.data.message).to.be.a('string')
              
//               done()
//             })
//           })
//         })
        
     
//       })
      
    
    
// })  