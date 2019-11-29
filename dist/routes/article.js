"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _isAdmin = _interopRequireDefault(require("../middlewares/isAdmin"));

var _category = _interopRequireDefault(require("../controllers/category"));

var _article = _interopRequireDefault(require("../controllers/article"));

var _token = require("../helpers/token");

var _articleComment = _interopRequireDefault(require("../controllers/articleComment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var uploadArticle = _article["default"].uploadArticle,
    updateArticle = _article["default"].updateArticle,
    getSingleArticle = _article["default"].getSingleArticle,
    getAllArticles = _article["default"].getAllArticles,
    getArticlesInCategory = _article["default"].getArticlesInCategory,
    deleteArticle = _article["default"].deleteArticle,
    getFeed = _article["default"].getFeed;
var createArticleComment = _articleComment["default"].createArticleComment;
router.post('/', _token.verifyToken, uploadArticle);
router.patch('/:articleId', _token.verifyToken, updateArticle);
router.get('/:articleId', getSingleArticle);
router.get('/', getAllArticles);
router.get('/feed', _token.verifyToken, getFeed);
router.get('/cat/:categoryId', getArticlesInCategory); //article comment route

router.post('/:articleId/comment', _token.verifyToken, createArticleComment); //delete articles

router["delete"]('/:articleId', _token.verifyToken, deleteArticle);
var _default = router;
exports["default"] = _default;