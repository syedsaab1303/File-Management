const Document = require('../models/document.model');

// POST /documents — Create new document (no file yet)
exports.createDocument = async (req, res) => {
  const { title, content, folder } = req.body;

  const newDoc = await Document.create({
    title,
    content,
    folder,
    createdBy: req.user._id,
    versions: [],
  });

  res.status(201).json(newDoc);
};


// Create Version – POST /documents/:id/version
exports.addVersion = async (req, res) => {
    const { versionNumber } = req.body;
    const { id } = req.params;
  
    const doc = await Document.findOne({ _id: id, createdBy: req.user._id });
    if (!doc) return res.status(404).json({ message: 'Document not found' });
  
    const fileUrl = `https://storage.example.com/${doc.title.replace(/\s+/g, '_')}_v${versionNumber}.pdf`;
  
    const newVersion = {
      version: versionNumber,
      fileUrl,
    };
  
    doc.versions.push(newVersion);
    await doc.save();
  
    res.status(201).json(newVersion);
};


// Get Document Details – GET /documents/:id
exports.getDocumentById = async (req, res, next) => {
    try {
      const doc = await Document.findOne({
        _id: req.params.id,
        createdBy: req.user._id,
      });
  
      if (!doc) {
        res.status(404);
        throw new Error('Document not found');
      }
  
      res.json(doc);
    } catch (err) {
      next(err);
    }
  };
  


// Get All Versions – GET /documents/:id/versions
exports.getVersions = async (req, res) => {
    const doc = await Document.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
  
    if (!doc) return res.status(404).json({ message: 'Not found' });
  
    res.json(doc.versions);
};


// Update Document – PUT /documents/:id
exports.updateDocument = async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
  
    const doc = await Document.findOneAndUpdate(
      { _id: id, createdBy: req.user._id },
      { title, content },
      { new: true }
    );
  
    if (!doc) return res.status(404).json({ message: 'Not found' });
  
    res.json(doc);
};


// Delete Document – DELETE /documents/:id
exports.deleteDocument = async (req, res) => {
    const doc = await Document.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
  
    if (!doc) return res.status(404).json({ message: 'Not found' });
  
    res.json({ message: 'Document and all versions deleted' });
};


const Folder = require('../models/folder.model');

// Helper to recursively build folder path
const buildFolderPath = async (folderId, path = []) => {
  const folder = await Folder.findById(folderId);
  if (folder) {
    path.unshift(folder.name);
    if (folder.parentFolder) {
      return buildFolderPath(folder.parentFolder, path);
    }
  }
  return path.join('/');
};

// GET /filter?search=term
exports.filterDocuments = async (req, res) => {
  const search = req.query.search || '';
  const regex = new RegExp(search, 'i');

  const docs = await Document.find({
    createdBy: req.user._id,
    $or: [
      { title: regex },
      { content: regex }
    ]
  });

  const results = await Promise.all(
    docs.map(async (doc) => {
      const folderPath = doc.folder ? await buildFolderPath(doc.folder) : '';
      return {
        id: doc._id,
        title: doc.title,
        folderPath
      };
    })
  );

  res.json(results);
};


// GET /total-documents
exports.getTotalDocuments = async (req, res) => {
    const count = await Document.countDocuments({ createdBy: req.user._id });
    res.json({ totalDocuments: count });
  };
  
