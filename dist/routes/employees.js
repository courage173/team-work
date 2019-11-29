"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _isAdmin = _interopRequireDefault(require("../middlewares/isAdmin"));

var _validatCredentials = require("../middlewares/validatCredentials");

var _gifs = _interopRequireDefault(require("../controllers/gifs"));

var _token = require("../helpers/token");

var _gifComment = _interopRequireDefault(require("../controllers/gifComment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var fileUpload = require("express-fileupload");

var uploadGif = _gifs["default"].uploadGif,
    deleteGifs = _gifs["default"].deleteGifs,
    getAllGifs = _gifs["default"].getAllGifs,
    getOneGif = _gifs["default"].getOneGif;
var createGifComment = _gifComment["default"].createGifComment;
router.use(fileUpload({
  useTempFiles: true
})); //uploading gifs

router.post('/gifs', _token.verifyToken, uploadGif);
router["delete"]('/delete-gifs/:gif_id', _token.verifyToken, deleteGifs);
router.get('/all-gifs', getAllGifs);
router.get('/:id', getOneGif); //gif comments

router.post('/:gifId/comment', _token.verifyToken, _validatCredentials.validateComments, createGifComment); //Categories routes

var _default = router;
exports["default"] = _default;