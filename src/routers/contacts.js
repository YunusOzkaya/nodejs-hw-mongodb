const router = require('express').Router();
const { list, getById, createOne, patchOne, removeOne } = require('../controllers/contacts');
const validateBody = require('../middlewares/validationBody');
const isValidId = require('../middlewares/isValidId');
const { createContactSchema, updateContactSchema } = require('../schemas/contactSchemas');

router.get('/', list);
router.get('/:contactId', isValidId(), getById);
router.post('/', validateBody(createContactSchema), createOne);
router.patch('/:contactId', isValidId(), validateBody(updateContactSchema), patchOne);
router.delete('/:contactId', isValidId(), removeOne);

module.exports = router;
