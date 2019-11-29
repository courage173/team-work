"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _isAdmin = _interopRequireDefault(require("../middlewares/isAdmin"));

var _flagged = _interopRequireDefault(require("../controllers/flagged"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var flagArticles = _flagged["default"].flagArticles;
router.patch('/:articleId', flagArticles);
var _default = router;
exports["default"] = _default;