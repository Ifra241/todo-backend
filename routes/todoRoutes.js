const express = require('express');
const router = express.Router();
const TodoFolder = require('../models/TodoFolder');
const verify = require('../middleware/verify');

// Apply middleware to all routes
router.use(verify);

// ✅ Create a new folder
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    const folder = new TodoFolder({
      title,
      description,
      user: req.user.userId, // From JWT
    });

    await folder.save();
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating folder', error: error.message });
  }
});

// ✅ Get all folders for logged-in user
router.get('/', async (req, res) => {
  try {
    const folders = await TodoFolder.find({ user: req.user.userId });

    if (!folders || folders.length === 0) {
      return res.status(404).json({ message: 'No folders found' });
    }

    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching folders', error: error.message });
  }
});

// ✅ Get folder by ID (only if it belongs to user)
router.get('/:id', async (req, res) => {
  try {
    const folder = await TodoFolder.findById(req.params.id);

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    if (folder.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching folder', error: error.message });
  }
});

// ✅ Update folder by ID (only if it belongs to user)
router.put('/:id', async (req, res) => {
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

    res.json(updatedFolder);
  } catch (error) {
    res.status(500).json({ message: 'Error in updating', error: error.message });
  }
});

// ✅ Delete folder by ID (only if it belongs to user)
router.delete('/:id', async (req, res) => {
  try {
    const folder = await TodoFolder.findById(req.params.id);

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    if (folder.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await TodoFolder.findByIdAndDelete(req.params.id);

    res.json({ message: 'Folder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error in deleting folder', error: error.message });
  }
});

module.exports = router;
