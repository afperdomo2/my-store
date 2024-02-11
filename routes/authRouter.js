const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('../config/config');

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      console.log(1111111111);
      console.log('req:', req);
      const { user } = req;
      const payload = {
        sub: user.id,
        role: user.role,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      res.json({
        user,
        token,
      });
    } catch (error) {
      console.log(3333333333);
      next(error);
    }
  }
);

module.exports = router;
