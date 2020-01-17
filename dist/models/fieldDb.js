"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FeedService =
/*#__PURE__*/
function () {
  function FeedService() {
    _classCallCheck(this, FeedService);
  }

  _createClass(FeedService, null, [{
    key: "getFeed",
    value: function getFeed() {
      var getFeed, _ref, rows;

      return regeneratorRuntime.async(function getFeed$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              getFeed = "\n                SELECT a.\"article_id\" AS id, a.title, a.\"article\" AS \"article\",a.\"gif\" AS \"gifUrl\", c.category_name AS \"category/public_id\", a.\"created_on\", concat(\"first_name\", ' ', \"last_name\") AS author,image_url as ImagUrl FROM articles a INNER JOIN users u ON a.\"user_id\" = u.\"id\" INNER JOIN categories c ON a.\"category_id\" = c.\"category_id\"\n                UNION\n                SELECT g.\"gif_id\" AS id, g.title,g.\"article\" AS \"article\", g.\"gif_url\" AS \"gifUrl\", g.public_id AS \"category/public_id\", g.\"created_on\", concat(\"first_name\", ' ', \"last_name\") AS author, image_url as ImagUrl FROM gif g INNER JOIN users u ON g.\"user_id\" = u.\"id\" \n                ORDER BY \"created_on\" DESC";
              _context.next = 3;
              return regeneratorRuntime.awrap(_config["default"].query(getFeed));

            case 3:
              _ref = _context.sent;
              rows = _ref.rows;
              return _context.abrupt("return", rows);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);

  return FeedService;
}();

var _default = FeedService;
exports["default"] = _default;