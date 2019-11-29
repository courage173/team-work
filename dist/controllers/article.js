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

var Articles =
/*#__PURE__*/
function () {
  function Articles() {
    _classCallCheck(this, Articles);
  }

  _createClass(Articles, null, [{
    key: "model",
    value: function model() {
      return new _db["default"]('articles');
    }
  }, {
    key: "Cat",
    value: function Cat() {
      return new _db["default"]('categories');
    }
  }, {
    key: "uploadArticle",
    value: function uploadArticle(req, res) {
      var createdBy, userId, _req$body, title, article, categoryId, flagged, articleId, createdOn, category, rows;

      return regeneratorRuntime.async(function uploadArticle$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              createdBy = req.user.email;
              userId = req.user.userId;
              console.log(userId);
              _req$body = req.body, title = _req$body.title, article = _req$body.article, categoryId = _req$body.categoryId;
              flagged = req.body.flagged;
              articleId = (0, _identity["default"])(938327364);
              createdOn = dateTime;

              if (title) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", res.status(401).json({
                error: "error",
                data: {
                  message: "no article title provided"
                }
              }));

            case 10:
              if (!flagged) {
                flagged = false;
              }

              if (article) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", res.status(401).json({
                error: "error",
                data: {
                  message: "no article body provided"
                }
              }));

            case 13:
              _context.next = 15;
              return regeneratorRuntime.awrap(Articles.Cat().select('*', 'category_id=$1', [categoryId]));

            case 15:
              category = _context.sent;

              if (category[0]) {
                _context.next = 18;
                break;
              }

              return _context.abrupt("return", res.status(404).json({
                error: "error",
                message: "Specified Category not found"
              }));

            case 18:
              _context.next = 20;
              return regeneratorRuntime.awrap(Articles.model().insert('article_id,title,flagged, category_id,article,created_by,created_on,user_id', "'".concat(articleId, "', '").concat(title, "', '").concat(flagged, "', '").concat(categoryId, "','").concat(article, "','").concat(createdBy, "', '").concat(createdOn, "', '").concat(userId, "'")));

            case 20:
              rows = _context.sent;
              return _context.abrupt("return", res.status(201).json({
                status: "success",
                data: {
                  message: "Article successfully posted",
                  articleId: rows[0].article_id,
                  createdOn: rows[0].created_on,
                  title: rows[0].article
                }
              }));

            case 24:
              _context.prev = 24;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(500).json({
                error: _context.t0.message,
                e: _context.t0
              }));

            case 27:
              ;

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 24]]);
    }
  }, {
    key: "updateArticle",
    value: function updateArticle(req, res) {
      var articleId, row, createdBy, userId, _req$body2, title, article, createdOn, rows;

      return regeneratorRuntime.async(function updateArticle$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              articleId = req.params.articleId;
              _context2.next = 4;
              return regeneratorRuntime.awrap(Articles.model().select('*', 'article_id=$1', [articleId]));

            case 4:
              row = _context2.sent;

              if (row) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                error: "error",
                message: "article with specified Id not found"
              }));

            case 7:
              createdBy = req.user.email;
              userId = req.user.userId;
              _req$body2 = req.body, title = _req$body2.title, article = _req$body2.article;
              createdOn = dateTime;
              console.log(row[0].user_id);
              console.log(userId);

              if (!(row[0].user_id != userId)) {
                _context2.next = 15;
                break;
              }

              return _context2.abrupt("return", res.status(401).json({
                status: "error",
                message: "You cannot edit this article"
              }));

            case 15:
              _context2.next = 17;
              return regeneratorRuntime.awrap(Articles.model().update('title=$1,article=$2', 'article_id=$3', ["".concat(title), "".concat(article), "".concat(articleId)]));

            case 17:
              rows = _context2.sent;
              return _context2.abrupt("return", res.status(201).json({
                status: "success",
                data: {
                  message: "Article successfully updated",
                  title: title,
                  article: article,
                  articleId: articleId
                }
              }));

            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(500).json({
                error: _context2.t0.message,
                e: _context2.t0
              }));

            case 24:
              ;

            case 25:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 21]]);
    }
  }, {
    key: "getSingleArticle",
    value: function getSingleArticle(req, res) {
      var articleId, rows;
      return regeneratorRuntime.async(function getSingleArticle$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              articleId = req.params.articleId;
              _context3.next = 4;
              return regeneratorRuntime.awrap(Articles.model().select('*', 'article_id=$1', [articleId]));

            case 4:
              rows = _context3.sent;

              if (rows[0]) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", res.status(404).json({
                status: 'error',
                message: 'Article with the specified articleId NOT found'
              }));

            case 7:
              return _context3.abrupt("return", res.status(201).json({
                status: "success",
                data: {
                  ArticleId: rows[0].article_id,
                  createdOn: rows[0].created_on,
                  title: rows[0].title,
                  article: rows[0].article
                }
              }));

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(500).json({
                error: _context3.t0.message,
                e: _context3.t0
              }));

            case 13:
              ;

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 10]]);
    }
  }, {
    key: "getAllArticles",
    value: function getAllArticles(req, res) {
      var rows;
      return regeneratorRuntime.async(function getAllArticles$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return regeneratorRuntime.awrap(Articles.model().select('*'));

            case 3:
              rows = _context4.sent;

              if (rows[0]) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return", res.status(404).json({
                status: 'error',
                message: 'Articles not found'
              }));

            case 6:
              return _context4.abrupt("return", res.status(201).json({
                status: "success",
                data: rows
              }));

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(500).json({
                error: _context4.t0.message,
                e: _context4.t0
              }));

            case 12:
              ;

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }, {
    key: "deleteArticle",
    value: function deleteArticle(req, res) {
      var articleId, row, email, user_email;
      return regeneratorRuntime.async(function deleteArticle$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              articleId = req.params.articleId;
              console.log(articleId);
              _context5.next = 5;
              return regeneratorRuntime.awrap(Articles.model().select('*', 'article_id=$1', [articleId]));

            case 5:
              row = _context5.sent;

              if (row[0]) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return", res.status(404).json({
                status: "error",
                data: {
                  message: "article with required Id not found"
                }
              }));

            case 8:
              email = req.user.email;
              user_email = row[0].created_by;

              if (!(user_email !== email)) {
                _context5.next = 12;
                break;
              }

              return _context5.abrupt("return", res.status(401).json({
                status: "error",
                data: {
                  message: "you dont have permission to delete required specified article"
                }
              }));

            case 12:
              _context5.next = 14;
              return regeneratorRuntime.awrap(Articles.model()["delete"]('article_id=$1', [articleId]));

            case 14:
              return _context5.abrupt("return", res.status(200).json({
                status: "success",
                data: {
                  message: "article deleted successfully deleted",
                  articleId: articleId
                }
              }));

            case 17:
              _context5.prev = 17;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", res.status(500).json({
                error: _context5.t0.message,
                e: _context5.t0
              }));

            case 20:
              ;

            case 21:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[0, 17]]);
    }
  }, {
    key: "getArticlesInCategory",
    value: function getArticlesInCategory(req, res) {
      var categoryId, article;
      return regeneratorRuntime.async(function getArticlesInCategory$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              categoryId = req.params.categoryId;
              _context6.next = 4;
              return regeneratorRuntime.awrap(Articles.model().select('*', 'category_id=$1', [categoryId]));

            case 4:
              article = _context6.sent;

              if (article) {
                _context6.next = 7;
                break;
              }

              return _context6.abrupt("return", res.status(404).json({
                status: 'error',
                message: 'No articles in the specified Category'
              }));

            case 7:
              return _context6.abrupt("return", res.status(200).json({
                status: 'success',
                data: article,
                categoryId: categoryId
              }));

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", res.status(500).json({
                error: _context6.t0.message,
                e: _context6.t0
              }));

            case 13:
              ;

            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, null, null, [[0, 10]]);
    }
  }, {
    key: "getFeed",
    value: function getFeed(req, res) {
      var feed;
      return regeneratorRuntime.async(function getFeed$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              feed = _db["default"].getFeed();
              console.log(feed);
              _context7.next = 8;
              break;

            case 5:
              _context7.prev = 5;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", res.status(500).json({
                error: _context7.t0.message,
                e: _context7.t0
              }));

            case 8:
              ;

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, null, null, [[0, 5]]);
    }
  }]);

  return Articles;
}();

var _default = Articles;
exports["default"] = _default;