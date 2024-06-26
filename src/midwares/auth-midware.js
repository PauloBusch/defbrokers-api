const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
    return;
  }
  
  const token = req.body.token ||
    req.query.token ||
    req.headers['authorization'];

  if (!token) return res.status(403).send({ errors: ['No token provied.'] });
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if(err) {
      return res.status(403).send({ errors: ['Failed to authenticate token.'] });
    } else {
      req.user = decoded.user;
      next();
    }
  });
}
