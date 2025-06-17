const express = require('express');
const router = express.Router();
const Subtodo = require('../models/SubTodo');
const verify = require('../middleware/verify');

router.use(verify);


// Create a subtodo under a folder
router.post('/', async (req, res) => {
  try {
    const { title, description, priority, status, folder } = req.body;

    const subtodo = new Subtodo({
      title,
      description,
      priority,
      status,
      folder,
    });

    await subtodo.save();
    res.status(201).json(subtodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating subtodo', error: error.message });
  }
});

// ✅ Read all subtodos
router.get('/', async (req, res) => {
  try {
    const subtodos = await Subtodo.find().populate('folder');
    res.json(subtodos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subtodos', error: error.message });
  }
});

// ✅ Read one subtodo by ID
router.get('/:id', async (req, res) => {
  try {
    const subtodo = await Subtodo.findById(req.params.id).populate('folder');
    if (!subtodo) {
      return res.status(404).json({ message: 'Subtodo not found' });
    }
    res.json(subtodo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subtodo', error: error.message });
  }
});

// ✅ Update a subtodo
router.put('/:id', async (req, res) => {
  try {
    const updatedSubtodo = await Subtodo.findByIdAndUpdate(
      req.params.id, // which item to update
      req.body,// new data to replace old data
      { new: true } // return the updated document, not the old one

    );
    if (!updatedSubtodo) {
      return res.status(404).json({ message: 'Subtodo not found' });
    }
    res.json(updatedSubtodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subtodo', error: error.message });
  }
});

// ✅ Delete a subtodo
router.delete('/:id', async (req, res) => {
  try {
    const deletedSubtodo = await Subtodo.findByIdAndDelete(req.params.id);
    if (!deletedSubtodo) {
      return res.status(404).json({ message: 'Subtodo not found' });
    }
    res.json({ message: 'Subtodo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subtodo', error: error.message });
  }
});



module.exports = router;
