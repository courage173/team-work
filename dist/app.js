"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _admin = _interopRequireDefault(require("./routes/admin"));

var _employees = _interopRequireDefault(require("./routes/employees"));

var _category = _interopRequireDefault(require("./routes/category"));

var _article = _interopRequireDefault(require("./routes/article"));

var _feedRoute = _interopRequireDefault(require("./routes/feedRoute"));

var _path = require("path");

var _flaggedRoute = _interopRequireDefault(require("./routes/flaggedRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("babel-polyfill");

var app = (0, _express["default"])();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(_express["default"]["static"]((0, _path.resolve)(__dirname, 'src/public')));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use("/v1/auth", _admin["default"]);
app.use("/v1/gifs", _employees["default"]);
app.use("/v1/category", _category["default"]);
app.use("/v1/articles", _article["default"]);
app.use("/v1/feeds", _feedRoute["default"]);
app.use("/v1/flag", _flaggedRoute["default"]);
var _default = app;
exports["default"] = _default;