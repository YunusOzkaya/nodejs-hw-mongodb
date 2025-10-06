const { getAllContacts, getContactById } = require('../services/contacts');

async function getAllContactsCtrl(req, res, next) {
  try {
    const data = await getAllContacts();
    res
      .status(200)
      .json({ status: 200, message: 'Successfully found contacts!', data });
  } catch (e) {
    next(e);
  }
}

async function getContactByIdCtrl(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res
      .status(200)
      .json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
  } catch (e) {
    next(e);
  }
}

module.exports = { getAllContactsCtrl, getContactByIdCtrl };
