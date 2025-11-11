const Contact = require('../models/contact')

const find = (filter = {}, options = {}) => {
  const q = Contact.find(filter);
  if (options.sort) q.sort(options.sort);
  if (typeof options.skip === 'number') q.skip(options.skip);
  if (typeof options.limit === 'number') q.limit(options.limit);
  return q.lean();
}

const countDocuments = (filter = {}) => Contact.countDocuments(filter)

const createContact = (data) => Contact.create(data)

const getContactById = (id) => Contact.findById(id)

const getContactByIdAndUser = (id, userId) => Contact.findOne({ _id: id, userId }).lean()

const patchContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean()

const patchContactByIdAndUser = (id, userId, data) =>
  Contact.findOneAndUpdate({ _id: id, userId }, data, { new: true, runValidators: true }).lean()

const deleteContactById = (id) => Contact.findByIdAndDelete(id)

const deleteContactByIdAndUser = (id, userId) => Contact.findOneAndDelete({ _id: id, userId }).lean()

module.exports = {
  find,
  countDocuments,
  createContact,
  getContactById,
  getContactByIdAndUser,
  patchContactById,
  patchContactByIdAndUser,
  deleteContactById,
  deleteContactByIdAndUser,
}
