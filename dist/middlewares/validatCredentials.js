"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateCategory = exports.validateComments = exports.validateSigninCredentials = exports.validateRegisterationCredentials = void 0;

var _validatorjs = _interopRequireDefault(require("validatorjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var errorMessages = {
  required: 'the :attribute is required',
  email: 'the email format is invalid',
  min: 'Min :attribute limit is :min',
  max: 'Min :attribute limit is :min'
};

var validateCredentials = function validateCredentials(req, res, next, rules) {
  console.log(req.body);
  var validator = new _validatorjs["default"](req.body, rules, errorMessages);

  if (validator.passes()) {
    return next();
  }

  var errors = validator.errors.all();
  return res.status(400).json({
    message: 'Invalid Credentials',
    errors: errors
  });
};

var validateRegisterationCredentials = function validateRegisterationCredentials(req, res, next) {
  var rules = {
    first_name: 'required|alpha',
    last_name: 'required|alpha',
    email: 'required|email',
    password: 'required|min:6'
  };
  return validateCredentials(req, res, next, rules);
};

exports.validateRegisterationCredentials = validateRegisterationCredentials;

var validateSigninCredentials = function validateSigninCredentials(req, res, next) {
  var rules = {
    email: 'required|email',
    password: 'required|min:6'
  };
  return validateCredentials(req, res, next, rules);
};

exports.validateSigninCredentials = validateSigninCredentials;

var validateComments = function validateComments(req, res, next) {
  var rules = {
    comment: 'required|max:150'
  };
  return validateCredentials(req, res, next, rules);
};

exports.validateComments = validateComments;

var validateCategory = function validateCategory(req, res, next) {
  var rules = {
    categoryName: 'required|max:50'
  };
  return validateCredentials(req, res, next, rules);
};

exports.validateCategory = validateCategory;