const Contact = require('../models/contact')

const getAllContacts = () => Contact.find()

const createContact = (data) => Contact.create(data)

const getContactById = (id) => Contact.findById(id)

const patchContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true })

const deleteContactById = (id) => Contact.findByIdAndDelete(id)

module.exports = {
  getAllContacts,
  createContact,
  getContactById,
  patchContactById,
  deleteContactById,
}
