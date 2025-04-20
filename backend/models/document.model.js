const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
  version: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Folder',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    versions: [versionSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Document', documentSchema);
