"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _token = require("../helpers/token");

var _db = _interopRequireDefault(require("../models/db"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _identity = _interopRequireDefault(require("../middlewares/identity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_cloudinary["default"].config({
  cloud_name: 'dm4gkystq',
  api_key: '813183814586897',
  api_secret: 'wOQOg1fVvOnekj16eUJv4ow0hm0'
});

var Gifs =
/*#__PURE__*/
function () {
  function Gifs() {
    _classCallCheck(this, Gifs);
  }

  _createClass(Gifs, null, [{
    key: "model",
    value: function model() {
      return new _db["default"]('gif');
    }
  }, {
    key: "uploadGif",
    value: function uploadGif(req, res) {
      var file, _req$body, title, flagged, gifcloud, secureUrl, createdOn, publicId, identity, userId, createdBy, rows;

      return regeneratorRuntime.async(function uploadGif$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              file = req.files.image;
              _req$body = req.body, title = _req$body.title, flagged = _req$body.flagged;

              if (!title) {
                res.status(400).json({
                  message: "title required"
                });
              }

              console.log(flagged);
              _context.next = 7;
              return regeneratorRuntime.awrap(_cloudinary["default"].v2.uploader.upload(file.tempFilePath));

            case 7:
              gifcloud = _context.sent;
              secureUrl = gifcloud.secure_url, createdOn = gifcloud.created_at, publicId = gifcloud.public_id;
              identity = (0, _identity["default"])(120000);
              userId = req.user.userId;
              createdBy = req.user.email;
              _context.next = 14;
              return regeneratorRuntime.awrap(Gifs.model().insert('gif_id,title,flagged, public_id,gif_url,created_by,created_on,user_id', "'".concat(identity, "', '").concat(title, "', '").concat(flagged, "', '").concat(publicId, "','").concat(secureUrl, "','").concat(createdBy, "', '").concat(createdOn, "', '").concat(userId, "'")));

            case 14:
              rows = _context.sent;
              return _context.abrupt("return", res.status(201).json({
                status: 'success',
                data: {
                  gifId: rows[0].gif_id,
                  message: "gif image succesfully uploaded",
                  createdOn: rows[0].created_on,
                  title: rows[0].title,
                  imageUrl: rows[0].gif_url
                }
              }));

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(500).json({
                error: _context.t0.message,
                e: _context.t0
              }));

            case 21:
              ;

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 18]]);
    }
  }, {
    key: "deleteGifs",
    value: function deleteGifs(req, res) {
      var gif_id, row, email, user_email;
      return regeneratorRuntime.async(function deleteGifs$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              gif_id = req.params.gif_id;
              _context2.next = 4;
              return regeneratorRuntime.awrap(Gifs.model().select('*', 'gif_id=$1', [gif_id]));

            case 4:
              row = _context2.sent;

              if (row[0]) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                status: "error",
                data: {
                  message: "Gif with required id not found"
                }
              }));

            case 7:
              email = req.user.email;
              user_email = row[0].created_by;

              if (!(user_email !== email)) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("return", res.status(401).json({
                status: "error",
                data: {
                  message: "you dont have permission to delete required specified gif"
                }
              }));

            case 11:
              _context2.next = 13;
              return regeneratorRuntime.awrap(_cloudinary["default"].v2.uploader.destroy(row[0].public_id));

            case 13:
              _context2.next = 15;
              return regeneratorRuntime.awrap(Gifs.model()["delete"]('gif_id=$1', [gif_id]));

            case 15:
              return _context2.abrupt("return", res.status(200).json({
                status: "success",
                data: {
                  message: "gif post successfully deleted",
                  gif_id: gif_id
                }
              }));

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(500).json({
                error: _context2.t0.message,
                e: _context2.t0
              }));

            case 21:
              ;

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 18]]);
    }
  }, {
    key: "getAllGifs",
    value: function getAllGifs(req, res) {
      var row;
      return regeneratorRuntime.async(function getAllGifs$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(Gifs.model().selectOrder('*', 'created_on'));

            case 3:
              row = _context3.sent;
              res.status(200).json({
                status: "success",
                data: row
              });
              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(500).json({
                error: _context3.t0.message,
                e: _context3.t0
              }));

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }, {
    key: "getOneGif",
    value: function getOneGif(req, res) {
      var id, row;
      return regeneratorRuntime.async(function getOneGif$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              id = req.params.id;
              _context4.next = 4;
              return regeneratorRuntime.awrap(Gifs.model().select('*', 'gif_id=$1', [id]));

            case 4:
              row = _context4.sent;

              if (row[0]) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                status: "error",
                error: "cannot find gif of required id"
              }));

            case 7:
              return _context4.abrupt("return", res.status(200).json({
                status: "success",
                data: row[0]
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

  return Gifs;
}();

var _default = Gifs;
exports["default"] = _default;