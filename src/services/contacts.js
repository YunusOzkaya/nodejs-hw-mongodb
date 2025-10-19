const Contact = require("../models/contact");

const createContact = data => Contact.create(data);

const getContactById = id => Contact.findById(id);

const patchContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true });

const deleteContactById = id => Contact.findByIdAndDelete(id);

module.exports = {
  createContact,
  getContactById,
  patchContactById,
  deleteContactById
};
