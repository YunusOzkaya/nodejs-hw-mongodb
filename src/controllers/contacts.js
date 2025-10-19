const createError = require("http-errors");
const {
  createContact,
  getContactById,
  patchContactById,
  deleteContactById
} = require("../services/contacts");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) throw createError(404, "Contact not found");
  res.json({ status: 200, message: "OK", data: contact });
};

const create = async (req, res) => {
  const { name, phoneNumber, contactType } = req.body;
  if (!name || !phoneNumber || !contactType) throw createError(400, "name, phoneNumber, contactType are required");
  const contact = await createContact(req.body);
  res.status(201).json({ status: 201, message: "Successfully created a contact!", data: contact });
};

const patch = async (req, res) => {
  const { contactId } = req.params;
  const updated = await patchContactById(contactId, req.body);
  if (!updated) throw createError(404, "Contact not found");
  res.json({ status: 200, message: "Successfully patched a contact!", data: updated });
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const deleted = await deleteContactById(contactId);
  if (!deleted) throw createError(404, "Contact not found");
  res.status(204).send();
};

module.exports = { getById, create, patch, remove };
