const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Session = require('../models/session');
const createHttpError = require('http-errors');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

const ACCESS_TOKEN_EXPIRES_IN = 15 * 60; // seconds
const REFRESH_TOKEN_EXPIRES_IN = 30 * 24 * 60 * 60; // seconds

const findUserByEmail = (email) => User.findOne({ email });

const createUser = async ({ name, email, password }) => {
  const hash = await bcrypt.hash(password, 10);
  return User.create({ name, email, password: hash });
};

const verifyUserCredentials = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;
  return user;
};

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  const refreshToken = crypto.randomBytes(64).toString('hex');
  return { accessToken, refreshToken };
};

const createSessionForUser = async (user) => {
  // remove existing sessions for user
  await Session.deleteMany({ userId: String(user._id) });

  const payload = { _id: user._id, email: user.email };
  const { accessToken, refreshToken } = generateTokens(payload);

  const now = new Date();
  const accessTokenValidUntil = new Date(now.getTime() + ACCESS_TOKEN_EXPIRES_IN * 1000);
  const refreshTokenValidUntil = new Date(now.getTime() + REFRESH_TOKEN_EXPIRES_IN * 1000);

  const session = await Session.create({
    userId: String(user._id),
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil
  });

  return session;
};

const refreshSession = async (refreshToken) => {
  const existing = await Session.findOne({ refreshToken });
  if (!existing) throw createHttpError(401, 'Invalid refresh token');

  // delete existing
  await Session.deleteOne({ _id: existing._id });

  // find user
  const user = await User.findById(existing.userId);
  if (!user) throw createHttpError(401, 'User not found');

  const session = await createSessionForUser(user);
  return session;
};

const deleteSessionByRefreshToken = (refreshToken) => Session.deleteOne({ refreshToken });

const findSessionByAccessToken = (accessToken) => Session.findOne({ accessToken });

module.exports = {
  findUserByEmail,
  createUser,
  verifyUserCredentials,
  createSessionForUser,
  refreshSession,
  deleteSessionByRefreshToken,
  findSessionByAccessToken
};
