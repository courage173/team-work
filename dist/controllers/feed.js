"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fieldDb = _interopRequireDefault(require("../models/fieldDb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getFeed = function getFeed(req, res) {
  var result;
  return regeneratorRuntime.async(function getFeed$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_fieldDb["default"].getFeed());

        case 2:
          result = _context.sent;

          if (!result) {
            res.status(200).json({
              error: "error",
              message: "No Aricles or gifs Post found"
            });
          }

          res.status(200).json({
            status: "success",
            data: result
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = getFeed;
exports["default"] = _default;