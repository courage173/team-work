"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _child_process = require("child_process");

var _app = _interopRequireDefault(require("../app"));

var _chai = _interopRequireDefault(require("chai"));

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe("create-user and Login Testing", function () {
  before(function (done) {
    var dump = 'psql -h localhost -d testDb -U postgres -f backend/tests/testDb.sql';
    (0, _child_process.exec)(dump, function (err) {
      done();
    });
  });
  describe("Post successfull/v1/auth/create-user", function () {
    it("return signup successfull", function (done) {
      _chai["default"].request(_app["default"]).post("/v1/auth/create-user").set("Accept", "application/json").send({
        id: 2,
        first_name: "kola",
        last_name: "wole",
        email: "courageosemwengie@gmail.com",
        password: "pedro123",
        is_admin: true
      }).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data.is_admin).to.equal(true);
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.first_name).to.equal('kola');
        expect(res.body.data.last_name).to.equal('wole');
        expect(res.body.data.email).to.equal('courageosemwengie@gmail.com');
        done();
      });
    });
  });
  describe('POST email already in use/v1/auth/create-user', function () {
    it('should return user with this email already exist', function (done) {
      _chai["default"].request(_app["default"]).post('/v1/auth/create-user').set('Accept', 'application/json').send({
        id: 15,
        email: 'bosky@gmail.com',
        first_name: 'faith',
        last_name: 'osemwengie',
        password: 'developer',
        is_admin: true
      }).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(409);
        expect(res.body.message).to.equal('this email is already in use');
        done();
      });
    });
  });
  describe('POST should return email is invalid/v1/auth/create-user', function () {
    it('should return error when email is invalid', function (done) {
      _chai["default"].request(_app["default"]).post('/v1/auth/create-user').set('Accept', 'application/json').send(_users["default"][3]).end(function (err, res) {
        var email = res.body.errors.email;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(email[0]).to.equal('the email format is invalid');
        done();
      });
    });
  });
  describe('POST should return password length is less than 6 or invalid/v1/auth/create-user', function () {
    it('should return error when password length is less than 6 or invalid', function (done) {
      _chai["default"].request(_app["default"]).post('/v1/auth/create-user').set('Accept', 'application/json').send(_users["default"][4]).end(function (err, res) {
        var password = res.body.errors.password;
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(password[0]).to.equal('Min password limit is 6');
        done();
      });
    });
  });
  describe("return Signing Successfull", function () {
    it("should return login sucessful", function (done) {
      _chai["default"].request(_app["default"]).post("/v1/auth/signin").set('Accept', 'application/json').send({
        email: "courageosemwengie@gmail.com",
        password: "pedro123"
      }).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data.user_id).to.equal(1);
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.first_name).to.equal('kola');
        expect(res.body.data.last_name).to.equal('wole');
        expect(res.body.data.email).to.equal('courageosemwengie@gmail.com');
        done();
      });
    });
  });
  describe('POST should return email field not filled /v1/auth/signin', function () {
    it('should return error when email field is not filled', function (done) {
      _chai["default"].request(_app["default"]).post('/v1/auth/signin').set('Accept', 'application/json').send(_users["default"][8]).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Invalid Credentials');
        done();
      });
    });
  });
  describe('POST should return email format incorrect/v1/auth/signin', function () {
    it('should return error when email format is incorrect', function (done) {
      _chai["default"].request(_app["default"]).post('/v1/auth/signin').set('Accept', 'application/json').send(_users["default"][9]).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Invalid Credentials');
        done();
      });
    });
  });
  describe('POST should return password field not filled/v1/auth/signin', function () {
    it('should return error when password field is not filled', function (done) {
      _chai["default"].request(_app["default"]).post('/v1/auth/signin').set('Accept', 'application/json').send(_users["default"][10]).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Invalid Credentials');
        done();
      });
    });
  });
  describe('POST should return password incorrect/v1/auth/signin', function () {
    it('should return error when password is incorrect', function (done) {
      _chai["default"].request(_app["default"]).post('/v1/auth/signin').set('Accept', 'application/json').send(_users["default"][11]).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Invalid Credentials');
        done();
      });
    });
  });
});