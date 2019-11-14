import jwt from 'jsonwebtoken';

export const createToken = (data) => {
  const token = jwt.sign(data, 'secret', { expiresIn: '1h' });

  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console
  
  console.log(token)
  
  
  if (token == null) {
    return res.status(403).json({
      status: 'error',
      message: 'No token found'
    });
  }
  else{    
    jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVodW5zQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsInVzZXJJZCI6OCwiaWF0IjoxNTczNzIyNjQxLCJleHAiOjE1NzM3MjYyNDF9.Pew9r__o0l2TfDLgjOpZVglsrlpFsdHS6g9vAA2rzTU", 'secret', function (err, decoded) {
      console.log(err)
      console.log(decoded)
    })
  }  
};
