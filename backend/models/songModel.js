const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    songName: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    songUrl: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Songs', goalSchema);
