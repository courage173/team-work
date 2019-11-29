"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("../config/config"));

var _category = _interopRequireDefault(require("../controllers/category"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Model =
/*#__PURE__*/
function () {
  function Model(table) {
    _classCallCheck(this, Model);

    this.table = table;
    this.pool = _config["default"];
    this.pool.on('error', function (err, client) {
      console.log('error');
    });
  }

  _createClass(Model, [{
    key: "select",
    value: function select(columns, clause, values) {
      var query, _ref, rows;

      return regeneratorRuntime.async(function select$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (clause) {
                query = "SELECT ".concat(columns, " FROM ").concat(this.table, " WHERE ").concat(clause);
              } else {
                query = "SELECT ".concat(columns, " FROM ").concat(this.table);
              }

              _context.next = 4;
              return regeneratorRuntime.awrap(this.pool.query(query, values));

            case 4:
              _ref = _context.sent;
              rows = _ref.rows;
              return _context.abrupt("return", rows);

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              throw _context.t0;

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[0, 9]]);
    }
  }, {
    key: "selectOrder",
    value: function selectOrder(columns, clause, values) {
      var query, _ref2, rows;

      return regeneratorRuntime.async(function selectOrder$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              query = "SELECT ".concat(columns, " FROM ").concat(this.table, " ORDER BY created_on DESC ");
              _context2.next = 4;
              return regeneratorRuntime.awrap(this.pool.query(query, values));

            case 4:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              return _context2.abrupt("return", rows);

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0;

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[0, 9]]);
    }
  }, {
    key: "insert",
    value: function insert(columns, selector, values) {
      var query, _ref3, rows;

      return regeneratorRuntime.async(function insert$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              query = "INSERT INTO ".concat(this.table, " (").concat(columns, ") VALUES (").concat(selector, ") returning *");
              _context3.prev = 1;
              console.log(query);
              _context3.next = 5;
              return regeneratorRuntime.awrap(this.pool.query(query, values));

            case 5:
              _ref3 = _context3.sent;
              rows = _ref3.rows;
              return _context3.abrupt("return", rows);

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](1);
              throw _context3.t0;

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[1, 10]]);
    }
  }, {
    key: "update",
    value: function update(columns, clause, values) {
      var query, _ref4, rows;

      return regeneratorRuntime.async(function update$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              query = "UPDATE ".concat(this.table, " SET ").concat(columns, " WHERE ").concat(clause, " returning *");
              _context4.prev = 1;
              _context4.next = 4;
              return regeneratorRuntime.awrap(this.pool.query(query, values));

            case 4:
              _ref4 = _context4.sent;
              rows = _ref4.rows;
              return _context4.abrupt("return", rows[0]);

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](1);
              throw _context4.t0;

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[1, 9]]);
    }
  }, {
    key: "delete",
    value: function _delete(clause, values) {
      var query, _ref5, rows;

      return regeneratorRuntime.async(function _delete$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              query = "DELETE FROM ".concat(this.table, " WHERE ").concat(clause, " returning *");
              _context5.prev = 1;
              _context5.next = 4;
              return regeneratorRuntime.awrap(this.pool.query(query, values));

            case 4:
              _ref5 = _context5.sent;
              rows = _ref5.rows;
              return _context5.abrupt("return", rows[0]);

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](1);
              throw _context5.t0;

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[1, 9]]);
    }
  }, {
    key: "getFeed",
    value: function getFeed() {
      var getFeed, _ref6, rows;

      return regeneratorRuntime.async(function getFeed$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              getFeed = "\n              SELECT a.\"articleId\" AS id, a.title, a.\"articleImage\" AS \"articleImage/url\", c.category AS \"category/public_id\", a.\"createdOn\", concat(\"firstName\", ' ', \"lastName\") AS author FROM articles a INNER JOIN users u ON a.\"userId\" = u.\"userId\" INNER JOIN categories c ON a.\"categoryId\" = c.\"categoryId\"\n              UNION\n              SELECT g.\"gifId\" AS id, g.title, g.\"imageUrl\" AS \"articleImage/url\", g.public_id AS \"category/public_id\", g.\"createdOn\", concat(\"firstName\", ' ', \"lastName\") AS author FROM gifs g INNER JOIN users u ON g.\"userId\" = u.\"userId\" \n              ORDER BY \"createdOn\" DESC";
              _context6.next = 3;
              return regeneratorRuntime.awrap(this.pool.query(getFeed));

            case 3:
              _ref6 = _context6.sent;
              rows = _ref6.rows;
              return _context6.abrupt("return", rows);

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Model;
}();

var _default = Model;
exports["default"] = _default;