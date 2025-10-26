const { Types } = require('mongoose');
module.exports = (paramName = 'contactId') => (req, res, next) => {
  const id = req.params[paramName];
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status: 400, message: 'Invalid id' });
  }
  next();
};
