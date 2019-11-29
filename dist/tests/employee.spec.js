"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _child_process = require("child_process");

var _app = _interopRequireDefault(require("../app"));

var _chai = _interopRequireDefault(require("chai"));

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
var token;
var id;
var catId;
var articleId;
describe("testing for gifs Post/Delete/Get", function () {
  beforeEach(function (done) {
    done();
  });
  describe("Post should return sucesss/v1/gifs/gifs", function () {
    it("should sign in first", function (done) {
      _chai["default"].request(_app["default"]).post('/v1/auth/signin').set('Accept', 'application/json').send({
        email: "courageosemwengie@gmail.com",
        password: "pedro123"
      }).end(function (err, res) {
        token = res.body.data.token;
        done();
      });
    });
    it("image post should return successfull", function (done) {
      _chai["default"].request(_app["default"]).post('/v1/gifs/gifs').set("Authorization", "Bearer " + token).field({
        title: "new pic",
        flagged: true
      }).attach('image', './backend/pic.png').end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data.imageUrl).to.be.a('string');
        expect(res.body.data.title).to.be.a('string');
        id = res.body.data.gifId;
        console.log(res.body.data.title);
        done();
      });
    }); //get a particular gif

    describe("to get a particular gif /v1/gifs/:id", function () {
      it("should successfully a particular all gifs", function (done) {
        _chai["default"].request(_app["default"]).get("/v1/gifs/".concat(id)).end(function (err, res) {
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('object');
          done();
        });
      });
    });
    describe("it should reject invalid gifs /v1/gifs/all-gifs", function () {
      it("should successfully get all gifs", function (done) {
        _chai["default"].request(_app["default"]).get("/v1/gifs/10").end(function (err, res) {
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('cannot find gif of required id');
          done();
        });
      });
    });
    /*get all gifs*/

    describe("to get all gifs /v1/gifs/all-gifs", function () {
      it("should successfully get all gifs", function (done) {
        _chai["default"].request(_app["default"]).get("/v1/gifs/all-gifs").end(function (err, res) {
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('array');
          done();
        });
      });
    }); //this are test for Gif comments
    //posting a comment on a gif

    describe("Post should return successful v1/gifs/<:gifId>/comment", function () {
      it("should return return post successfull", function (done) {
        _chai["default"].request(_app["default"]).post("/v1/gifs/".concat(id, "/comment")).set("Accept", "application/json").set("Authorization", "Bearer " + token).send({
          comment: "so who is winning the election",
          flagged: false
        }).end(function (err, res) {
          console.log(res.body.status);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal('success');
          expect(res.body.data.comment).to.be.a('string');
          done();
        });
      });
    });
    describe("Post should return invalid credentials v1/gifs/<:gifId>/comment", function () {
      it("should return return invalid credentials when no comment", function (done) {
        _chai["default"].request(_app["default"]).post("/v1/gifs/".concat(id, "/comment")).set("Accept", "application/json").set("Authorization", "Bearer " + token).send({
          flagged: false
        }).end(function (err, res) {
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Invalid Credentials');
          expect(res.body.errors.comment).to.be.an('array');
          done();
        });
      });
    }); //delete gif

    describe("to delete a gif '/v1/gifs/delete-gifs/${id}", function () {
      it("should delete gif successfully", function (done) {
        _chai["default"].request(_app["default"])["delete"]("/v1/gifs/delete-gifs/".concat(id)).set("Authorization", "Bearer " + token).end(function (err, res) {
          expect(res.body.status).to.equal('success');
          expect(res.body.data.message).to.be.a('string');
          done();
        });
      });
    }); //creating a category

    describe("to create a new single category /v1/category", function () {
      it("should return category creation successfull", function (done) {
        _chai["default"].request(_app["default"]).post('/v1/category').set('Accept', 'application/json').send({
          categoryName: "Clothe123"
        }).end(function (err, res) {
          expect(res.body.status).to.equal('success');
          expect(res.body.data.message).to.be.a('string');
          catId = res.body.data.categoryId;
          done();
        });
      });
    });
    describe("when category already exist /v1/category", function () {
      it("should return error, category already exist", function (done) {
        _chai["default"].request(_app["default"]).post('/v1/category').set('Accept', 'application/json').send({
          categoryName: "Clothe123"
        }).end(function (err, res) {
          expect(res.body.error).to.equal('error');
          expect(res.body.message).to.be.a('string');
          done();
        });
      });
    });
    describe("to create a new single category /v1/category", function () {
      it("should return Invalid credentials", function (done) {
        _chai["default"].request(_app["default"]).post('/v1/category').set('Accept', 'application/json').send({}).end(function (err, res) {
          expect(res.body.message).to.equal('Invalid Credentials');
          done();
        });
      });
    }); //updating a category

    describe("to update a single category /v1/category/:categoryId", function () {
      it("should return update sucesssful", function (done) {
        _chai["default"].request(_app["default"]).patch("/v1/category/".concat(catId)).set('Accept', 'application/json').send({
          categoryName: 'Fashion2'
        }).end(function (err, res) {
          expect(res.body.status).to.equal('success');
          expect(res.body.data.message).to.be.a('string');
          done();
        });
      });
    }); //getting a single category

    describe("to get a single category /v1/category/:categoryId", function () {
      it("should succesfully fetch single category", function (done) {
        _chai["default"].request(_app["default"]).get("/v1/category/".concat(catId)).set('Accept', 'application/json').end(function (err, res) {
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.a('object');
          done();
        });
      });
    });
    describe("to get all categories /v1/category/", function () {
      it("should succesfully fetch single category", function (done) {
        _chai["default"].request(_app["default"]).get('/v1/category/').set('Accept', 'application/json').end(function (err, res) {
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('array');
          done();
        });
      });
    }); //post an article successfully

    describe("Posting an article /v1/articles", function () {
      it("it should return article post successfull", function (done) {
        _chai["default"].request(_app["default"]).post("/v1/articles").set("Authorization", "Bearer " + token).set("Accept", "application/json").send({
          title: "Love",
          article: "I love Faith Aigbokhan",
          flagged: false,
          categoryId: catId
        }).end(function (err, res) {
          expect(res.body).to.be.an("object");
          expect(res.body.status).to.equal('success');
          expect(res.body.data.message).to.equal('Article successfully posted');
          expect(res.body.data.title).to.be.a("string");
          articleId = res.body.data.articleId;
          done();
        });
      });
    }); //it should return error 

    describe("Posting an article /v1/articles", function () {
      it("it should return eror", function (done) {
        _chai["default"].request(_app["default"]).post("/v1/articles").set("Authorization", "Bearer " + token).set("Accept", "application/json").send({
          title: "Love",
          flagged: false
        }).end(function (err, res) {
          expect(res.body).to.be.an("object");
          expect(res.body.error).to.equal('error');
          expect(res.body.data.message).to.equal('no article body provided');
          done();
        });
      });
    }); //it should error

    describe("Posting an article /v1/articles", function () {
      it("it should return error", function (done) {
        _chai["default"].request(_app["default"]).post("/v1/articles").set("Authorization", "Bearer " + token).set("Accept", "application/json").send({
          article: "I love Faith Aigbokhan",
          flagged: false
        }).end(function (err, res) {
          expect(res.body).to.be.an("object");
          expect(res.body.error).to.equal('error');
          expect(res.body.data.message).to.equal('no article title provided');
          done();
        });
      });
    }); //updating article

    describe("Updating an article /v1/articles", function () {
      it("it should return successfull", function (done) {
        _chai["default"].request(_app["default"]).patch("/v1/articles/".concat(articleId)).set("Authorization", "Bearer " + token).set("Accept", "application/json").send({
          title: "Love is wonderfull",
          article: "faith is the woman of my dreams and i wish to make her my wife"
        }).end(function (err, res) {
          expect(res.body).to.be.an("object");
          expect(res.body.status).to.equal('success');
          expect(res.body.data.message).to.equal('Article successfully updated');
          done();
        });
      });
    }); //get a single article

    describe("getting a single article", function () {
      it("should return successfull", function (done) {
        _chai["default"].request(_app["default"]).get("/v1/articles/".concat(articleId)).set("Accept", "application/json").end(function (err, res) {
          expect(res.body).to.be.an("object");
          expect(res.body.status).to.equal('success');
          done();
        });
      });
    }); //article with Id not found

    describe("getting an article that does not exist", function () {
      it("should return error", function (done) {
        _chai["default"].request(_app["default"]).get('/v1/articles/23432').set("Accept", "application/json").end(function (err, res) {
          expect(res.body).to.be.an("object");
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Article with the specified articleId NOT found');
          done();
        });
      });
    }); // getting all articles

    describe("getting all article", function () {
      it("should return successfull", function (done) {
        _chai["default"].request(_app["default"]).get('/v1/articles/').set("Accept", "application/json").end(function (err, res) {
          expect(res.body).to.be.an("object");
          expect(res.body.status).to.equal('success');
          done();
        });
      });
    }); //article comment

    describe("Post should return successful v1/articles/<:articleId>/comment", function () {
      it("should return return post successfull", function (done) {
        _chai["default"].request(_app["default"]).post("/v1/articles/".concat(articleId, "/comment")).set("Accept", "application/json").set("Authorization", "Bearer " + token).send({
          comment: "so who is winning the election",
          flagged: false
        }).end(function (err, res) {
          console.log(res.body.status);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal('success');
          expect(res.body.data.comment).to.be.a('string');
          done();
        });
      });
    });
    describe("Post should return invalid credentials v1/articles/<:articleId>/comment", function () {
      it("should return return invalid credentials when no comment", function (done) {
        _chai["default"].request(_app["default"]).post("/v1/articles/".concat(articleId, "/comment")).set("Accept", "application/json").set("Authorization", "Bearer " + token).send({
          flagged: false
        }).end(function (err, res) {
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('no comment provided');
          done();
        });
      });
    }); //delete an articles

    describe("to delete an articles '/v1/gifs/${id}", function () {
      it("should delete articles successfully", function (done) {
        _chai["default"].request(_app["default"])["delete"]("/v1/articles/".concat(articleId)).set("Authorization", "Bearer " + token).end(function (err, res) {
          expect(res.body.status).to.equal('success');
          expect(res.body.data.message).to.be.a('string');
          done();
        });
      });
    }); //delete category is here so the article test can have access to category id before it is deleted

    describe('to delete a category /v1/category/:categoryId', function () {
      it('should succesfully delete category', function (done) {
        _chai["default"].request(_app["default"])["delete"]("/v1/category/".concat(catId)).set('Accept', 'application/json').end(function (err, res) {
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('category successfully deleted');
          done();
        });
      });
    });
  });
});