// Archivo para probar la librería

const jwt = require('jsonwebtoken');

const secretKey = 'migato';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY5MjMwNjY1M30.4o16ZBBTkYxvb-r6ZmPAwngWqzUkkHvmtcBjYou5MG4';

function verifyToken(token, secretKey) {
  return jwt.verify(token, secretKey);
}

const payload = verifyToken(token, secretKey);
console.log(payload);
