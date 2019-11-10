import jwt from 'jsonwebtoken';

export const isAdmin = (req, res, next) => {
  const token = req.headers.authorization || req.params.token || req.headers['x-access-token'] || req.body.token;
  if (!token) {
    return res.status(403).json({
      status: 'error',
      message: 'No token found'
    });
  }
  return jwt.verify(token, 'krealax', (error, user) => {
    if (error) {
      return res.status(401).json({
        status: 'error',
        message: 'token is invalid'
      });
    }
    req.user = user;
    if (req.user.isAdmin === false) {
      return res.status(403).json({
        status: 'error',
        message: 'You need authorization to perform this'
      });
    }
    next();
  });
};
