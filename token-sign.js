// Archivo para probar la librería
const jwt = require('jsonwebtoken');

const secretKey = 'migato';
const payload = {
  sub: 1,
  role: 'customer',
};

function signToken(payload, secretKey) {
  return jwt.sign(payload, secretKey);
}

const token = signToken(payload, secretKey);
console.log(token);
