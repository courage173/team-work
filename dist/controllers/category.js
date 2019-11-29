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

var Category =
/*#__PURE__*/
function () {
  function Category() {
    _classCallCheck(this, Category);
  }

  _createClass(Category, null, [{
    key: "model",
    value: function model() {
      return new _db["default"]('categories');
    }
  }, {
    key: "createCat",
    value: function createCat(req, res) {
      var categoryName, categoryId, row, rows;
      return regeneratorRuntime.async(function createCat$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              categoryName = req.body.categoryName;
              categoryId = (0, _identity["default"])(75673647);

              if (categoryName) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", res.status(404).json({
                error: "error",
                message: "cannot post empty Category Name"
              }));

            case 5:
              _context.next = 7;
              return regeneratorRuntime.awrap(Category.model().select('*', 'category_name=$1', [categoryName]));

            case 7:
              row = _context.sent;

              if (!row[0]) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                error: "error",
                message: " category already exist"
              }));

            case 10:
              _context.next = 12;
              return regeneratorRuntime.awrap(Category.model().insert('category_id, category_name', "'".concat(categoryId, "', '").concat(categoryName, "'")));

            case 12:
              rows = _context.sent;
              return _context.abrupt("return", res.status(201).json({
                status: "success",
                data: {
                  message: "Category created successfully",
                  categoryId: categoryId,
                  categoryName: rows[0].category_name
                }
              }));

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(500).json({
                error: _context.t0.message,
                e: _context.t0
              }));

            case 19:
              ;

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 16]]);
    }
  }, {
    key: "updateCat",
    value: function updateCat(req, res) {
      var categoryId, categoryName, update;
      return regeneratorRuntime.async(function updateCat$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              categoryId = req.params.categoryId;
              console.log(categoryId);
              categoryName = req.body.categoryName;
              console.log(categoryName); //async update(columns, clause, values)

              _context2.next = 7;
              return regeneratorRuntime.awrap(Category.model().update('category_name=$1', 'category_id=$2', ["".concat(categoryName), "".concat(categoryId)]));

            case 7:
              update = _context2.sent;
              console.log(update);
              return _context2.abrupt("return", res.status(201).json({
                status: 'success',
                data: {
                  message: "Category updated successfully",
                  categoryName: update.category_name
                }
              }));

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(500).json({
                error: _context2.t0.message,
                e: _context2.t0
              }));

            case 15:
              ;

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 12]]);
    }
  }, {
    key: "getAllCat",
    value: function getAllCat(req, res) {
      var rows;
      return regeneratorRuntime.async(function getAllCat$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(Category.model().select("*"));

            case 3:
              rows = _context3.sent;
              return _context3.abrupt("return", res.status(201).json({
                status: "success",
                data: rows
              }));

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(500).json({
                error: _context3.t0.message,
                e: _context3.t0
              }));

            case 10:
              ;

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }, {
    key: "getSingleCat",
    value: function getSingleCat(req, res) {
      var categoryId, rows;
      return regeneratorRuntime.async(function getSingleCat$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              categoryId = req.params.categoryId;
              _context4.next = 4;
              return regeneratorRuntime.awrap(Category.model().select('*', 'category_id=$1', [categoryId]));

            case 4:
              rows = _context4.sent;

              if (rows[0]) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return", res.status(404).json({
                error: 'error',
                message: 'category with specified id not found'
              }));

            case 7:
              return _context4.abrupt("return", res.status(200).json({
                status: "success",
                data: {
                  categoryId: rows[0].category_id,
                  categoryName: rows[0].category_name
                }
              }));

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(500).json({
                error: _context4.t0.message,
                e: _context4.t0
              }));

            case 13:
              ;

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 10]]);
    }
  }, {
    key: "deleteCat",
    value: function deleteCat(req, res) {
      var categoryId, rows, row;
      return regeneratorRuntime.async(function deleteCat$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              categoryId = req.params.categoryId;
              _context5.next = 4;
              return regeneratorRuntime.awrap(Category.model().select('*', 'category_id=$1', [categoryId]));

            case 4:
              rows = _context5.sent;

              if (rows[0]) {
                _context5.next = 7;
                break;
              }

              return _context5.abrupt("return", res.status(404).json({
                error: 'error',
                message: 'category with specified id not found'
              }));

            case 7:
              console.log(categoryId);
              _context5.next = 10;
              return regeneratorRuntime.awrap(Category.model()["delete"]('category_id=$1', [categoryId]));

            case 10:
              row = _context5.sent;
              return _context5.abrupt("return", res.status(200).json({
                status: "success",
                message: 'category successfully deleted'
              }));

            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", res.status(500).json({
                error: _context5.t0.message,
                e: _context5.t0
              }));

            case 17:
              ;

            case 18:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[0, 14]]);
    }
  }]);

  return Category;
}();

var _default = Category;
exports["default"] = _default;