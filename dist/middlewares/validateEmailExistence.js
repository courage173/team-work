"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var model = new _db["default"]('users');

var validateEmailExistence = function validateEmailExistence(req, res, next) {
  var email, user;
  return regeneratorRuntime.async(function validateEmailExistence$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          email = req.body.email;
          _context.next = 4;
          return regeneratorRuntime.awrap(model.select('*', 'email=$1', [email]));

        case 4:
          user = _context.sent;

          if (!user[0]) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            status: 'error',
            message: 'this email is already in use'
          }));

        case 7:
          next();
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            error: _context.t0.message,
            e: _context.t0
          }));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var _default = validateEmailExistence;
exports["default"] = _default;