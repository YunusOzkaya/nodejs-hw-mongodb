const express = require('express')
const { getById, create, patch, remove } = require('../controllers/contacts')
const ctrlWrapper = require('../utils/ctrlWrapper')

const router = express.Router()

router.get('/:contactId', ctrlWrapper(getById))
router.post('/', ctrlWrapper(create))
router.patch('/:contactId', ctrlWrapper(patch))
router.delete('/:contactId', ctrlWrapper(remove))

module.exports = router
