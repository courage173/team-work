"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../models/db"));

var _identity = _interopRequireDefault(require("../middlewares/identity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var today = new Date();
var date = "".concat(today.getFullYear(), "-").concat(today.getMonth() + 1, "-").concat(+today.getDate());
var time = "".concat(today.getHours(), ":").concat(today.getMinutes(), ":").concat(today.getSeconds());
var dateTime = "".concat(date, " ").concat(time);

var GifComment =
/*#__PURE__*/
function () {
  function GifComment() {
    _classCallCheck(this, GifComment);
  }

  _createClass(GifComment, null, [{
    key: "model",
    value: function model() {
      return new _db["default"]('gif');
    }
  }, {
    key: "comment",
    value: function comment() {
      return new _db["default"]('gif_comment');
    }
  }, {
    key: "createGifComment",
    value: function createGifComment(req, res) {
      var gifId, createdBy, userId, commentId, comment, flagged, createdOn, row, rows;
      return regeneratorRuntime.async(function createGifComment$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              gifId = req.params.gifId;
              createdBy = req.user.email;
              userId = req.user.userId;
              commentId = (0, _identity["default"])(7444985);
              comment = req.body.comment;
              flagged = req.body.flagged;
              createdOn = dateTime;
              _context.next = 10;
              return regeneratorRuntime.awrap(GifComment.model().select('*', 'gif_id=$1', [gifId]));

            case 10:
              row = _context.sent;

              if (row[0]) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", res.status(404).json({
                status: "error",
                data: {
                  message: "Gif does not exist"
                }
              }));

            case 13:
              if (!flagged) {
                flagged = false;
              }

              if (comment) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", res.status(401).json({
                status: "error",
                message: "no comment provided"
              }));

            case 16:
              _context.next = 18;
              return regeneratorRuntime.awrap(GifComment.comment().insert('comment_id,gif_id,comments,flagged,user_id,created_by, created_on', "'".concat(commentId, "','").concat(gifId, "','").concat(comment, "', '").concat(flagged, "','").concat(userId, "','").concat(createdBy, "','").concat(createdOn, "'")));

            case 18:
              rows = _context.sent;
              return _context.abrupt("return", res.status(201).json({
                status: "success",
                data: {
                  message: "comment successfully created",
                  createdOn: rows[0].created_on,
                  gifTitle: row[0].title,
                  comment: rows[0].comments
                }
              }));

            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(500).json({
                error: _context.t0.message,
                e: _context.t0
              }));

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 22]]);
    }
  }]);

  return GifComment;
}();

var _default = GifComment;
exports["default"] = _default;