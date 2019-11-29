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

var ArticleComment =
/*#__PURE__*/
function () {
  function ArticleComment() {
    _classCallCheck(this, ArticleComment);
  }

  _createClass(ArticleComment, null, [{
    key: "model",
    value: function model() {
      return new _db["default"]('articles');
    }
  }, {
    key: "comment",
    value: function comment() {
      return new _db["default"]('article_comment');
    }
  }, {
    key: "createArticleComment",
    value: function createArticleComment(req, res) {
      var articleId, createdBy, userId, commentId, _req$body, comment, flagged, createdOn, row, rows;

      return regeneratorRuntime.async(function createArticleComment$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              articleId = req.params.articleId;
              createdBy = req.user.email;
              userId = req.user.userId;
              commentId = (0, _identity["default"])(7444985);
              _req$body = req.body, comment = _req$body.comment, flagged = _req$body.flagged;
              createdOn = dateTime;
              _context.next = 9;
              return regeneratorRuntime.awrap(ArticleComment.model().select('*', 'article_id=$1', [articleId]));

            case 9:
              row = _context.sent;

              if (row[0]) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", res.status(404).json({
                status: "error",
                data: {
                  message: "Article does not exist"
                }
              }));

            case 12:
              if (!flagged) {
                flagged = false;
              }

              if (comment) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return", res.status(401).json({
                status: "error",
                message: "no comment provided"
              }));

            case 15:
              _context.next = 17;
              return regeneratorRuntime.awrap(ArticleComment.comment().insert('comment_id,article_id,comments,flagged,user_id,created_by, created_on', "'".concat(commentId, "','").concat(articleId, "','").concat(comment, "', '").concat(flagged, "','").concat(userId, "','").concat(createdBy, "','").concat(createdOn, "'")));

            case 17:
              rows = _context.sent;
              return _context.abrupt("return", res.status(201).json({
                status: "success",
                data: {
                  message: "comment successfully created",
                  createdOn: rows[0].created_on,
                  articleTitle: row[0].title,
                  article: row[0].article,
                  comment: rows[0].comments
                }
              }));

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(500).json({
                error: _context.t0.message,
                e: _context.t0
              }));

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 21]]);
    }
  }]);

  return ArticleComment;
}();

var _default = ArticleComment;
exports["default"] = _default;