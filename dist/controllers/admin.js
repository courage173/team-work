"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _token = require("../helpers/token");

var _db = _interopRequireDefault(require("../models/db"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _password = _interopRequireDefault(require("../helpers/password"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_cloudinary["default"].config({
  cloud_name: 'dm4gkystq',
  api_key: '813183814586897',
  api_secret: 'wOQOg1fVvOnekj16eUJv4ow0hm0'
});

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "model",
    value: function model() {
      return new _db["default"]('users');
    }
  }, {
    key: "signUp",
    value: function signUp(req, res) {
      var _req$body, email, first_name, last_name, is_admin, jobroles, department, gender, address, password, token, rows;

      return regeneratorRuntime.async(function signUp$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, email = _req$body.email, first_name = _req$body.first_name, last_name = _req$body.last_name, is_admin = _req$body.is_admin, jobroles = _req$body.jobroles, department = _req$body.department, gender = _req$body.gender, address = _req$body.address;
              password = req.body.password;
              token = (0, _token.createToken)(_defineProperty({
                email: email,
                is_admin: is_admin
              }, "is_admin", is_admin));
              password = _password["default"].hashPassword(password);
              _context.next = 7;
              return regeneratorRuntime.awrap(User.model().insert('email, first_name, last_name, password, is_admin, jobroles, department, gender, address', "'".concat(email, "', '").concat(first_name, "', '").concat(last_name, "', '").concat(password, "', '").concat(is_admin, "', '").concat(jobroles, "', '").concat(department, "', '").concat(gender, "', '").concat(address, "'")));

            case 7:
              rows = _context.sent;
              return _context.abrupt("return", res.status(201).json({
                status: 'success',
                data: {
                  id: rows[0].id,
                  is_admin: rows[0].is_admin,
                  token: token,
                  first_name: rows[0].first_name,
                  last_name: rows[0].last_name,
                  email: rows[0].email,
                  department: rows[0].department,
                  jobroles: rows[0].jobroles
                }
              }));

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(500).json({
                error: _context.t0.message,
                e: _context.t0
              }));

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 11]]);
    }
  }, {
    key: "signIn",
    value: function signIn(req, res) {
      var _req$body2, email, password, registered, isAdmin, userId, firstName, lastName, token;

      return regeneratorRuntime.async(function signIn$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              console.log(email);
              _context2.next = 5;
              return regeneratorRuntime.awrap(User.model().select('*', 'email=$1', [email]));

            case 5:
              registered = _context2.sent;

              if (!(registered[0] && _password["default"].decryptPassword(password, registered[0].password))) {
                _context2.next = 13;
                break;
              }

              isAdmin = registered[0].is_admin;
              userId = registered[0].id;
              firstName = registered[0].first_name;
              lastName = registered[0].last_name;
              token = (0, _token.createToken)({
                email: email,
                isAdmin: isAdmin,
                userId: userId
              });
              return _context2.abrupt("return", res.status(200).json({
                status: 'success',
                data: {
                  user_id: registered[0].id,
                  is_admin: registered[0].is_admin,
                  token: token,
                  first_name: registered[0].first_name,
                  last_name: registered[0].last_name,
                  email: registered[0].email
                }
              }));

            case 13:
              return _context2.abrupt("return", res.status(401).json({
                errors: {
                  message: 'invalid email or password'
                }
              }));

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(500).json({
                error: 'server error',
                e: _context2.t0
              }));

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 16]]);
    }
  }, {
    key: "uploadPic",
    value: function uploadPic(req, res) {
      var file, userId, user, imagecloud, secureUrl, rows;
      return regeneratorRuntime.async(function uploadPic$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              file = req.files.image; //console.log(file)

              userId = req.user.userId;
              _context3.next = 5;
              return regeneratorRuntime.awrap(User.model().select('*', 'id=$1', [userId]));

            case 5:
              user = _context3.sent;

              if (user[0]) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                error: "you don't have permission to perform this"
              }));

            case 8:
              _context3.next = 10;
              return regeneratorRuntime.awrap(_cloudinary["default"].v2.uploader.upload(file.tempFilePath));

            case 10:
              imagecloud = _context3.sent;
              secureUrl = imagecloud.secure_url;
              _context3.next = 14;
              return regeneratorRuntime.awrap(User.model().update('image_url=$1', 'id=$2', ["".concat(secureUrl), "".concat(userId)]));

            case 14:
              rows = _context3.sent;
              return _context3.abrupt("return", res.status(201).json({
                status: 'success',
                data: {
                  imageUrl: secureUrl
                }
              }));

            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(500).json({
                error: _context3.t0.message,
                e: _context3.t0
              }));

            case 21:
              ;

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 18]]);
    }
  }, {
    key: "getUser",
    value: function getUser(req, res) {
      var userId, user, email, isAdmin;
      return regeneratorRuntime.async(function getUser$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              //console.log(req)
              userId = req.user.userId;
              _context4.next = 4;
              return regeneratorRuntime.awrap(User.model().select('*', 'id=$1', [userId]));

            case 4:
              user = _context4.sent;
              email = user[0].email;
              isAdmin = user[0].is_admin; //const token = createToken({ email, isAdmin, userId })

              return _context4.abrupt("return", res.status(200).json({
                status: "success",
                data: {
                  user_id: user[0].id,
                  is_admin: user[0].is_admin,
                  first_name: user[0].first_name,
                  last_name: user[0].last_name,
                  email: user[0].email,
                  department: user[0].department,
                  jobrole: user[0].jobroles,
                  imageUrl: user[0].image_url
                }
              }));

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(500).json({
                error: _context4.t0.message,
                e: _context4.t0
              }));

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 10]]);
    }
  }]);

  return User;
}();

var _default = User;
exports["default"] = _default;