const TodoFolder = require('../models/TodoFolder');

// Create a new folder
const createFolder = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    const folder = new TodoFolder({
      title,
      description,
      priority,
      status,
      user: req.user.userId,
    });

    await folder.save();
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating folder', error: error.message });
  }
};

// Get all folders for logged-in user
const getAllFolders = async (req, res) => {
  try {
    const folders = await TodoFolder.find({ user: req.user.userId });

    if (!folders || folders.length === 0) {
      return res.status(404).json({ message: 'No folders found' });
    }

    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching folders', error: error.message });
  }
};

// Get folder by ID
const getFolderById = async (req, res) => {
  try {
    const folder = await TodoFolder.findById(req.params.id);

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    if (folder.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching folder', error: error.message });
  }
};

// Update folder by ID
const updateFolder = async (req, res) => {
  try {
    const folder = await TodoFolder.findById(req.params.id);

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    if (folder.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedFolder = await TodoFolder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedFolder);
  } catch (error) {
    res.status(500).json({ message: 'Error in updating', error: error.message });
  }
};

// Delete folder by ID
const deleteFolder = async (req, res) => {
  try {
    const folder = await TodoFolder.findById(req.params.id);

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    if (folder.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await TodoFolder.findByIdAndDelete(req.params.id);

    res. status(200).json({ message: 'Folder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error in deleting folder', error: error.message });
  }
};

module.exports = {
  createFolder,
  getAllFolders,
  getFolderById,
  updateFolder,
  deleteFolder,
};
