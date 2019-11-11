import Model from '../models/db';

const model = new Model('users');

const validateEmailExistence = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await model.select('*', 'email=$1', [email]);
    if (user[0]) {
      return res.status(409).json({
        status: 'error',
        message: 'this email is already in use'
      });
    }
    next();
  } catch (e) {
    return res.status(500).json({
      error: e.message,
      e
    });
  }
};


export default validateEmailExistence;
