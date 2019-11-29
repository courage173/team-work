"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var isAdmin = function isAdmin(req, res, next) {
  if (req.user.isAdmin === false) {
    return res.status(403).send('Not allowed to perform this process');
  }

  next();
};

var _default = isAdmin;
exports["default"] = _default;