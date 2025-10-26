const Contact = require('../db/models/contact');

const list = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    type,
    isFavourite
  } = req.query;

  const p = Math.max(parseInt(page, 10) || 1, 1);
  const l = Math.min(Math.max(parseInt(perPage, 10) || 10, 1), 100);

  const filter = {};
  if (type) filter.contactType = type;
  if (typeof isFavourite !== 'undefined') {
    if (isFavourite === 'true' || isFavourite === true) filter.isFavourite = true;
    if (isFavourite === 'false' || isFavourite === false) filter.isFavourite = false;
  }

  const sort = {};
  const order = String(sortOrder).toLowerCase() === 'desc' ? -1 : 1;
  sort[sortBy] = order;

  const totalItems = await Contact.countDocuments(filter);
  const totalPages = Math.max(Math.ceil(totalItems / l), 1);
  const skip = (p - 1) * l;

  const data = await Contact.find(filter).sort(sort).skip(skip).limit(l).lean();

  return res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data,
      page: p,
      perPage: l,
      totalItems,
      totalPages,
      hasPreviousPage: p > 1,
      hasNextPage: p < totalPages
    }
  });
};

const getById = async (req, res) => {
  const doc = await Contact.findById(req.params.contactId).lean();
  if (!doc) return res.status(404).json({ status: 404, message: 'Not found' });
  return res.json({ status: 200, message: 'OK', data: doc });
};

const createOne = async (req, res) => {
  const created = await Contact.create(req.body);
  return res.status(201).json({ status: 201, message: 'Created', data: created });
};

const patchOne = async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true, runValidators: true }).lean();
  if (!updated) return res.status(404).json({ status: 404, message: 'Not found' });
  return res.json({ status: 200, message: 'Updated', data: updated });
};

const removeOne = async (req, res) => {
  const deleted = await Contact.findByIdAndDelete(req.params.contactId).lean();
  if (!deleted) return res.status(404).json({ status: 404, message: 'Not found' });
  return res.json({ status: 200, message: 'Deleted', data: deleted._id });
};

module.exports = { list, getById, createOne, patchOne, removeOne };
