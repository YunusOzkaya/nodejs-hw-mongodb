const createHttpError = require('http-errors');
const authService = require('../services/auth');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await authService.findUserByEmail(email);
  if (user) throw createHttpError(409, 'Email in use');

  const created = await authService.createUser({ name, email, password });
  const userData = { _id: created._id, name: created.name, email: created.email, createdAt: created.createdAt, updatedAt: created.updatedAt };
  return res.status(201).json({ status: 201, message: 'Successfully registered a user!', data: userData });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.verifyUserCredentials(email, password);
  if (!user) throw createHttpError(401, 'Email or password is wrong');

  const session = await authService.createSessionForUser(user);

  // set refresh token as httpOnly cookie
  res.cookie('refreshToken', session.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

  return res.json({ status: 200, message: 'Successfully logged in an user!', data: { accessToken: session.accessToken } });
};

const refresh = async (req, res) => {
  const { refreshToken } = req.cookies || {};
  if (!refreshToken) throw createHttpError(401, 'Refresh token missing');

  const session = await authService.refreshSession(refreshToken);
  res.cookie('refreshToken', session.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
  return res.json({ status: 200, message: 'Successfully refreshed a session!', data: { accessToken: session.accessToken } });
};

const logout = async (req, res) => {
  const { refreshToken } = req.cookies || {};
  if (!refreshToken) return res.status(204).send();

  await authService.deleteSessionByRefreshToken(refreshToken);
  res.clearCookie('refreshToken');
  return res.status(204).send();
};

module.exports = { register, login, refresh, logout };
