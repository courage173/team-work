"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _isAdmin = _interopRequireDefault(require("../middlewares/isAdmin"));

var _category = _interopRequireDefault(require("../controllers/category"));

var _validatCredentials = require("../middlewares/validatCredentials");

var _token = require("../helpers/token");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var createCat = _category["default"].createCat,
    updateCat = _category["default"].updateCat,
    getAllCat = _category["default"].getAllCat,
    getSingleCat = _category["default"].getSingleCat,
    deleteCat = _category["default"].deleteCat;
router.post('/', _validatCredentials.validateCategory, createCat);
router.patch('/:categoryId', _validatCredentials.validateCategory, updateCat);
router.get('/', getAllCat);
router.get('/:categoryId', getSingleCat);
router["delete"]('/:categoryId', deleteCat);
var _default = router;
exports["default"] = _default;