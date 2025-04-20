const Folder = require('../models/folder.model');
const Document = require('../models/document.model');

// GET /viewstore — Get root-level folders
exports.getRootFolders = async (req, res, next) => {
    try {
      const folders = await Folder.find({
        createdBy: req.user._id,
        parentFolder: null,
      });
      res.json(folders);
    } catch (err) {
      next(err);
    }
  };
  

// GET /viewstore/:folderId — Get subfolders & documents
exports.getFolderContent = async (req, res) => {
  const { folderId } = req.params;
  const folders = await Folder.find({ parentFolder: folderId, createdBy: req.user._id });
  const Document = require('../models/document.model');
  const documents = await Document.find({ folder: folderId, createdBy: req.user._id });

  res.json({ folders, documents });
};

// POST /folders — Create folder
exports.createFolder = async (req, res) => {
  const { name, parentFolder } = req.body;
  const folder = await Folder.create({
    name,
    parentFolder: parentFolder || null,
    createdBy: req.user._id,
  });
  res.status(201).json(folder);
};


// PUT /folders/:id — Rename folder
exports.updateFolder = async (req, res) => {
    const { name } = req.body;
  
    const folder = await Folder.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { name },
      { new: true }
    );
  
    if (!folder) return res.status(404).json({ message: 'Folder not found' });
  
    res.json(folder);
  };
  
  
// Helper to recursively delete subfolders + their documents
const deleteFolderRecursive = async (folderId, userId) => {
  const subfolders = await Folder.find({ parentFolder: folderId, createdBy: userId });

  for (const sub of subfolders) {
    await deleteFolderRecursive(sub._id, userId);
  }

  // Delete documents inside this folder
  await Document.deleteMany({ folder: folderId, createdBy: userId });

  // Delete the folder itself
  await Folder.findByIdAndDelete(folderId);
};

// DELETE /folders/:id
exports.deleteFolder = async (req, res) => {
  const { id } = req.params;
  const folder = await Folder.findOne({ _id: id, createdBy: req.user._id });

  if (!folder) return res.status(404).json({ message: 'Folder not found' });

  await deleteFolderRecursive(id, req.user._id);

  res.json({ message: 'Folder and all nested content deleted successfully' });
};
