const jwt = require('jsonwebtoken');

const getJwtToken = (username, password) => {
  const privateKey = fs.readFileSync('rsa');
  return jwt.sign({username: username, password: password}, privateKey, {algorithm: 'RS256'});
};

export default getJwtToken;
