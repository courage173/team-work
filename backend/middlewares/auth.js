import jwt from 'jsonwebtoken';

const authorization = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  
  if (!token) return res.status(401).send('Access denied. No token provided.');
  try {
    console.log(token)
    const decodedPayload = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVodW5zQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsInVzZXJJZCI6OCwiaWF0IjoxNTczNzIwNTAxLCJleHAiOjE1NzM3MjQxMDF9.luqEXSSZkDADv9CSr28qW1oDYA7T1wuuWvo8Q2p51e0", 'secret');
    req.user = decodedPayload;       
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = authorization;
