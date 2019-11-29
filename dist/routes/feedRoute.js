"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _token = require("../helpers/token");

var _feed = _interopRequireDefault(require("../controllers/feed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', _token.verifyToken, _feed["default"]);
var _default = router;
exports["default"] = _default;