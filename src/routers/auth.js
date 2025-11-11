const router = require('express').Router();
const validateBody = require('../middlewares/validationBody');
const { registerSchema, loginSchema } = require('../schemas/authSchemas');
const ctrl = require('../controllers/auth');
const ctrlWrapper = require('../utils/ctrlWrapper');

router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(ctrl.register),
);
router.post('/login', validateBody(loginSchema), ctrlWrapper(ctrl.login));
router.post('/refresh', ctrlWrapper(ctrl.refresh));
router.post('/logout', ctrlWrapper(ctrl.logout));

module.exports = router;
