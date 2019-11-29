"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _isAdmin = _interopRequireDefault(require("../middlewares/isAdmin"));

var _validatCredentials = require("../middlewares/validatCredentials");

var _validateEmailExistence = _interopRequireDefault(require("../middlewares/validateEmailExistence"));

var _admin = _interopRequireDefault(require("../controllers/admin"));

var _token = require("../helpers/token");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var fileUpload = require("express-fileupload");

var signUp = _admin["default"].signUp,
    signIn = _admin["default"].signIn,
    uploadPic = _admin["default"].uploadPic,
    getUser = _admin["default"].getUser;
router.use(fileUpload({
  useTempFiles: true
}));
router.post('/create-user', _validatCredentials.validateRegisterationCredentials, _validateEmailExistence["default"], signUp);
router.post('/signin', _validatCredentials.validateSigninCredentials, signIn);
router.patch('/upload-image', _token.verifyToken, uploadPic);
router.get('/user', _token.verifyToken, getUser);
var _default = router;
exports["default"] = _default;