const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const authService = require('../services/auth');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

const authenticate = async (req, res, next) => {
  try {
    const auth = req.get('Authorization') || '';
    const parts = auth.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') throw createHttpError(401, 'Unauthorized');
    const token = parts[1];

    // verify jwt signature and expiry
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') throw createHttpError(401, 'Access token expired');
      throw createHttpError(401, 'Invalid access token');
    }

    // ensure session exists and not expired
    const session = await authService.findSessionByAccessToken(token);
    if (!session) throw createHttpError(401, 'Session not found');
    if (new Date() > new Date(session.accessTokenValidUntil)) throw createHttpError(401, 'Access token expired');

    const user = await User.findById(session.userId).lean();
    if (!user) throw createHttpError(401, 'User not found');

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
