"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.createToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createToken = function createToken(data) {
  var token = _jsonwebtoken["default"].sign(data, 'secret', {
    expiresIn: '1h'
  });

  return token;
};

exports.createToken = createToken;

var verifyToken = function verifyToken(req, res, next) {
  var token = req.headers.authorization.split(' ')[1];
  console.log(token);

  if (!token) {
    return res.status(403).json({
      status: 'error',
      message: 'No token found'
    });
  }

  return _jsonwebtoken["default"].verify(token, 'secret', function (error, user) {
    if (error) {
      console.log(user);
      return res.status(401).json({
        status: 'error',
        message: 'token is invalid'
      });
    }

    req.user = user;
    next();
  });
};

exports.verifyToken = verifyToken;