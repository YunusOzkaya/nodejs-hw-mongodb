const { Schema, model } = require('mongoose');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'other'],
      required: true,
    },
    isFavourite: { type: Boolean, default: false },
    userId: { type: String, required: true, index: true },
  },
  { timestamps: true },
);

module.exports = model('Contact', contactSchema);
