import chaiHttp from 'chai-http';
import { exec } from 'child_process';
import app from '../app';
import chai from 'chai';
import users from '../models/users';


chai.use(chaiHttp)
const { expect } = chai;

let token;
let id;
let catId;
let articleId;


describe("testing for gifs Post/Delete/Get", ()=>{
    beforeEach((done) => {
      done()
      
    });

    describe("Post should return sucesss/v1/gifs/gifs",()=>{
      it("should sign in first",(done)=>{
        chai.request(app)
          .post('/v1/auth/signin')
          .set('Accept', 'application/json')
          .send({
            email: "courageosemwengie@gmail.com",
            password: "pedro123"
          })
          .end((err,res)=>{
            
            
            token = res.body.data.token
            
            
            
            
    
            done();
          })

      })
        it("image post should return successfull",(done)=>{
          chai.request(app)
          .post('/v1/gifs/gifs')
          .set("Authorization", "Bearer " + token)
          .field({
              title: "new pic",
              flagged: true,
              
          })
          .attach('image', './backend/pic.png')
          .end((err,res)=>{
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.equal('success');
              expect(res.body.data.imageUrl).to.be.a('string')
              expect(res.body.data.title).to.be.a('string');
              id = res.body.data.gifId
              
              
              done();
          })
        })
        //get a particular gif
        describe("to get a particular gif /v1/gifs/:id",()=>{
          it("should successfully a particular all gifs",(done)=>{
            chai.request(app)
            .get(`/v1/gifs/${id}`)
            .end((err,res)=>{
              expect(res.body.status).to.equal('success')
              expect(res.body.data).to.be.an('object')
              done()
            })
          })
        });

        describe("it should reject invalid gifs /v1/gifs/all-gifs",()=>{
          it("should successfully get all gifs",(done)=>{
            chai.request(app)
            .get("/v1/gifs/10")
            .end((err,res)=>{
              expect(res.body.status).to.equal('error')
              expect(res.body.error).to.equal('cannot find gif of required id')
              done()
            })
          })
        })

        /*get all gifs*/
        describe("to get all gifs /v1/gifs/all-gifs",()=>{
          it("should successfully get all gifs",(done)=>{
            chai.request(app)
            .get("/v1/gifs/all-gifs")
            .end((err,res)=>{
              expect(res.body.status).to.equal('success')
              expect(res.body.data).to.be.an('array')
              done()
            })
          })
        })

        //this are test for Gif comments

        //posting a comment on a gif

        describe("Post should return successful v1/gifs/<:gifId>/comment",()=>{
          it("should return return post successfull",(done)=>{
              chai.request(app)
              .post(`/v1/gifs/${id}/comment`)
              .set("Accept", "application/json")
              .set("Authorization", "Bearer " + token)
              .send({
                  comment: "so who is winning the election",
                  flagged: false
              })
              .end((err,res)=>{
                console.log(res.body.status)                  
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('success');
                expect(res.body.data.comment).to.be.a('string')
                done()
              })
          })
      })
      describe("Post should return invalid credentials v1/gifs/<:gifId>/comment",()=>{
        it("should return return invalid credentials when no comment",(done)=>{
            chai.request(app)
            .post(`/v1/gifs/${id}/comment`)
            .set("Accept", "application/json")
            .set("Authorization", "Bearer " + token)
            .send({
                flagged: false
            })
            .end((err,res)=>{
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.equal('Invalid Credentials');
                expect(res.body.errors.comment).to.be.an('array')
                done()
            })
        })
    })
        
        //delete gif
        
        describe("to delete a gif '/v1/gifs/delete-gifs/${id}",()=>{
          it("should delete gif successfully", (done)=>{
            chai.request(app)
            .delete(`/v1/gifs/delete-gifs/${id}`)
            .set("Authorization", "Bearer " + token)
            .end((err,res)=>{
              expect(res.body.status).to.equal('success')
              expect(res.body.data.message).to.be.a('string')
              
              done()
            })
          })
        })

        //creating a category
        describe("to create a new single category /v1/category",()=>{
          it("should return category creation successfull",(done)=>{
            chai.request(app)
            .post('/v1/category')
            .set('Accept', 'application/json')
            .send({categoryName: "Clothe123"})
            .end((err,res)=>{
              expect(res.body.status).to.equal('success')
              expect(res.body.data.message).to.be.a('string')
              catId = res.body.data.categoryId 
              done()
            })
          })
        })

        describe("when category already exist /v1/category",()=>{
          it("should return error, category already exist",(done)=>{
            chai.request(app)
            .post('/v1/category')
            .set('Accept', 'application/json')
            .send({categoryName: "Clothe123"})
            .end((err,res)=>{
              expect(res.body.error).to.equal('error')
              expect(res.body.message).to.be.a('string')
              done()
            })
          })
        })

        describe("to create a new single category /v1/category",()=>{
          it("should return Invalid credentials",(done)=>{
            chai.request(app)
            .post('/v1/category')
            .set('Accept', 'application/json')
            .send({})
            .end((err,res)=>{
              expect(res.body.message).to.equal('Invalid Credentials')
              done()
            })
          })
        })

        
        //updating a category
        describe("to update a single category /v1/category/:categoryId",()=>{
          it("should return update sucesssful",(done)=>{
            chai.request(app)
            .patch(`/v1/category/${catId}`)
            .set('Accept','application/json')
            .send({
              categoryName: 'Fashion2'
            })
            .end((err,res)=>{
              expect(res.body.status).to.equal('success')
              expect(res.body.data.message).to.be.a('string')
              done()
            })
          })
        })

        //getting a single category
        describe("to get a single category /v1/category/:categoryId",()=>{
          it("should succesfully fetch single category",(done)=>{
            chai.request(app)
            .get(`/v1/category/${catId}`)
            .set('Accept','application/json')
            .end((err,res)=>{
              expect(res.body.status).to.equal('success')
              expect(res.body.data).to.be.a('object')
              done()
            })
          })
        })
        describe("to get all categories /v1/category/",()=>{
          it("should succesfully fetch single category",(done)=>{
            chai.request(app)
            .get('/v1/category/')
            .set('Accept','application/json')
            .end((err,res)=>{
              expect(res.body.status).to.equal('success')
              expect(res.body.data).to.be.an('array')
              done()
            })
          })
        })

        




        //post an article successfully
        describe("Posting an article /v1/articles",()=>{
          it("it should return article post successfull",(done)=>{
            chai.request(app)
            .post("/v1/articles")
            .set("Authorization", "Bearer " + token)
            .set("Accept", "application/json")
            .send({
              title: "Love",
              article: "I love Faith Aigbokhan",
              flagged: false,
              category: "Fashion2"
            })
            .end((err,res)=>{
              expect(res.body).to.be.an("object")
              expect(res.body.status).to.equal('success')
              expect(res.body.data.message).to.equal('Article successfully posted')
              expect(res.body.data.title).to.be.a("string")
              articleId = res.body.data.articleId
              done()
            })
          })
        })

        //it should return error 

        describe("Posting an article /v1/articles",()=>{
          it("it should return eror",(done)=>{
            chai.request(app)
            .post("/v1/articles")
            .set("Authorization", "Bearer " + token)
            .set("Accept", "application/json")
            .send({
              title: "Love",
              flagged: false
            })
            .end((err,res)=>{
              expect(res.body).to.be.an("object")
              expect(res.body.error).to.equal('error')
              expect(res.body.data.message).to.equal('no article body provided')
              done()
            })
          })
        })

        //it should error
        describe("Posting an article /v1/articles",()=>{
          it("it should return error",(done)=>{
            chai.request(app)
            .post("/v1/articles")
            .set("Authorization", "Bearer " + token)
            .set("Accept", "application/json")
            .send({
              article: "I love Faith Aigbokhan",
              flagged: false
            })
            .end((err,res)=>{
              expect(res.body).to.be.an("object")
              expect(res.body.error).to.equal('error')
              expect(res.body.data.message).to.equal('no article title provided')
              done()
            })
          })
        })
        //updating article
        describe("Updating an article /v1/articles",()=>{
          it("it should return successfull",(done)=>{
            chai.request(app)
            .patch(`/v1/articles/${articleId}`)
            .set("Authorization", "Bearer " + token)
            .set("Accept", "application/json")
            .send({
              title: "Love is wonderfull",
              article: "faith is the woman of my dreams and i wish to make her my wife",
            })
            .end((err,res)=>{
              expect(res.body).to.be.an("object")
              expect(res.body.status).to.equal('success')
              expect(res.body.data.message).to.equal('Article successfully updated')
              done()
            })
          })
        })

        //get a single article
        describe("getting a single article",()=>{
          it("should return successfull",(done)=>{
            chai.request(app)
            .get(`/v1/articles/${articleId}`)
            .set("Accept","application/json")
            .end((err,res)=>{
              expect(res.body).to.be.an("object")
              expect(res.body.status).to.equal('success')
              done()
            })
          })
        })
        //article with Id not found
        describe("getting an article that does not exist",()=>{
          it("should return error",(done)=>{
            chai.request(app)
            .get('/v1/articles/23432')
            .set("Accept","application/json")
            .end((err,res)=>{
              expect(res.body).to.be.an("object")
              expect(res.body.status).to.equal('error')
              expect(res.body.message).to.equal('Article with the specified articleId NOT found')
              done()
            })
          })
        })

       // getting all articles
        describe("getting all article",()=>{
          it("should return successfull",(done)=>{
            chai.request(app)
            .get('/v1/articles/')
            .set("Accept","application/json")
            .end((err,res)=>{
              
              expect(res.body).to.be.an("object")
              expect(res.body.status).to.equal('success')
              done()
            })
          })
        })
        //getting user article
        describe("getting User articles",()=>{
          it("should return successfull",(done)=>{
            chai.request(app)
            .get(`/v1/articles/user-feed/${id}`)
            .set("Authorization", "Bearer " + token)
            .set("Accept","application/json")
            .end((err,res)=>{
              expect(res.body).to.be.an("object")
              expect(res.body.status).to.equal('success')
              done()
            })
          })
        })
        //getting all feeds
        describe("getting all feeds",()=>{
          it("should return successfull",(done)=>{
            chai.request(app)
            .get("/v1/feeds")
            .set("Authorization", "Bearer " + token)
            .set("Accept","application/json")
            .end((err,res)=>{
              expect(res.body).to.be.an("object")
              expect(res.body.status).to.equal('success')
              done()
            })
          })
        })

        //article comment
        describe("Post should return successful v1/articles/<:articleId>/comment",()=>{
          it("should return return post successfull",(done)=>{
              chai.request(app)
              .post(`/v1/articles/${articleId}/comment`)
              .set("Accept", "application/json")
              .set("Authorization", "Bearer " + token)
              .send({
                  comment: "so who is winning the election",
                  flagged: false
              })
              .end((err,res)=>{
                                  
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('success');
                expect(res.body.data.comment).to.be.a('string')
                done()
              })
          })
      })
      describe("Post should return invalid credentials v1/articles/<:articleId>/comment",()=>{
        it("should return return invalid credentials when no comment",(done)=>{
            chai.request(app)
            .post(`/v1/articles/${articleId}/comment`)
            .set("Accept", "application/json")
            .set("Authorization", "Bearer " + token)
            .send({
                flagged: false
            })
            .end((err,res)=>{
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.equal('no comment provided');
                done()
            })
        })
    })
    //delete an articles
    describe("to delete an articles '/v1/gifs/${id}",()=>{
      it("should delete articles successfully", (done)=>{
        chai.request(app)
        .delete(`/v1/articles/${articleId}`)
        .set("Authorization", "Bearer " + token)
        .end((err,res)=>{
          expect(res.body.status).to.equal('success')
          expect(res.body.data.message).to.be.a('string')
          
          done()
        })
      })
    })
    

          //delete category is here so the article test can have access to category id before it is deleted
        describe('to delete a category /v1/category/:categoryId',()=>{
          it('should succesfully delete category',(done)=>{
            chai.request(app)
            .delete(`/v1/category/${catId}`)
            .set('Accept', 'application/json')
            .end((err,res)=>{
              expect(res.body.status).to.equal('success')
              expect(res.body.message).to.equal('category successfully deleted')
              done()
            })
          })
        })
        
     
      })
      
    
    
})  