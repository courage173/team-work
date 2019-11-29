"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var hashPassword = function hashPassword(password) {
  return _bcrypt["default"].hashSync(password, 10);
};

var decryptPassword = function decryptPassword(userPassword, hashPassword) {
  return _bcrypt["default"].compareSync(userPassword, hashPassword);
};

var _default = {
  hashPassword: hashPassword,
  decryptPassword: decryptPassword
};
exports["default"] = _default;