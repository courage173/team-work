import Validator from 'validatorjs';

const errorMessages = {
  required: 'the :attribute is required',
  email: 'the email format is invalid',
  min: 'Min :attribute limit is :min',
};

const validateCredentials = (req, res, next, rules) => {
  const validator = new Validator(req.body, rules, errorMessages);
  if (validator.passes()) {
    return next();
  }
  const errors = validator.errors.all();
  return res.status(400).json({
    message: 'Invalid Credentials',
    errors
  });
};

export const validateRegisterationCredentials = (req, res, next) => {
  const rules = {
    first_name: 'required|alpha',
    last_name: 'required|alpha',
    email: 'required|email',
    password: 'required|min:6'
  };
  return validateCredentials(req, res, next, rules);
};

export const validateSigninCredentials = (req, res, next) => {
  const rules = {
    email: 'required|email',
    password: 'required|min:6'
  };
  return validateCredentials(req, res, next, rules);
};

export const validateComments = (req, res, next) => {
  const rules = {
    comment: 'required|max:150'
  };
  return validateCredentials(req, res, next, rules);
};




