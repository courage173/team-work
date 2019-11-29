"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Flagged =
/*#__PURE__*/
function () {
  function Flagged() {
    _classCallCheck(this, Flagged);
  }

  _createClass(Flagged, null, [{
    key: "model",
    value: function model() {
      return new _db["default"]('articles');
    }
  }, {
    key: "articleComment",
    value: function articleComment() {
      return new _db["default"]('article_comment');
    }
  }, {
    key: "gif",
    value: function gif() {
      return new _db["default"]('gif');
    }
  }, {
    key: "gifComment",
    value: function gifComment() {
      return new _db["default"]('gif_comment');
    }
  }, {
    key: "flagArticles",
    value: function flagArticles(req, res) {
      var articleId, row, flagged, rows;
      return regeneratorRuntime.async(function flagArticles$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              articleId = req.params.articleId;
              _context.next = 3;
              return regeneratorRuntime.awrap(Flagged.model().select('*', 'article_id=$1', [articleId]));

            case 3:
              row = _context.sent;

              if (row[0]) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(404).json({
                status: 'error',
                message: 'article with specified id not found'
              }));

            case 6:
              flagged = req.body.flagged;

              if (flagged) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", res.status(404).json({
                status: 'error',
                message: 'not provided'
              }));

            case 9:
              _context.next = 11;
              return regeneratorRuntime.awrap(Flagged.model().update('flagged=$1', 'article_id=$2', ["".concat(flagged), "".concat(articleId)]));

            case 11:
              rows = _context.sent;
              return _context.abrupt("return", res.status(200).json({
                status: 'success',
                message: 'Article sucessfully flagged'
              }));

            case 13:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);

  return Flagged;
}();

var _default = Flagged;
exports["default"] = _default;