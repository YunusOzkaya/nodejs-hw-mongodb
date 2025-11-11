const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const {
  list,
  getById,
  createOne,
  patchOne,
  removeOne,
} = require('../controllers/contacts');
const validateBody = require('../middlewares/validationBody');
const isValidId = require('../middlewares/isValidId');
const {
  createContactSchema,
  updateContactSchema,
} = require('../schemas/contactSchemas');
const ctrlWrapper = require('../utils/ctrlWrapper');

router.use(authenticate);

router.get('/', ctrlWrapper(list));
router.get('/:contactId', isValidId(), ctrlWrapper(getById));
router.post('/', validateBody(createContactSchema), ctrlWrapper(createOne));
router.patch(
  '/:contactId',
  isValidId(),
  validateBody(updateContactSchema),
  ctrlWrapper(patchOne),
);
router.delete('/:contactId', isValidId(), ctrlWrapper(removeOne));

module.exports = router;
