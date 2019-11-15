import jwt from 'jsonwebtoken';

export const createToken = (data) => {
  const token = jwt.sign(data, 'secret', { expiresIn: '1h' });

  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  console.log(token)
  
  
  if (!token) {
    return res.status(403).json({
      status: 'error',
      message: 'No token found'
    });
  }
  return jwt.verify(token, 'secret', (error, user) => {
    if (error) {
      console.log(user)
      return res.status(401).json({
        status: 'error',
        message: 'token is invalid'
      });
    }
    req.user = user;
    next();
  });
};
