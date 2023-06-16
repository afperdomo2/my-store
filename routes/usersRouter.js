const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    { id: 1, description: 'Usuario 1' },
    { id: 2, description: 'Usuario 2' },
    { id: 3, description: 'Usuario 3' },
  ]);
});

module.exports = router;
