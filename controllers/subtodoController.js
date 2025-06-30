const Subtodo = require('../models/SubTodo');

// Create a subtodo
const createSubtodo = async (req, res) => {
  try {
    const { title, description, priority, status, folder } = req.body;

    const subtodo = new Subtodo({ title, description, priority, status, folder });

    await subtodo.save();
    res.status(201).json(subtodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating subtodo', error: error.message });
  }
};

// Get all subtodos
const getAllSubtodos = async (req, res) => {
  try {
    const subtodos = await Subtodo.find().populate('folder');
    res.status(200).json(subtodos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subtodos', error: error.message });
  }
};

// Get subtodos by folderId
const getSubtodosByFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    const subtodos = await Subtodo.find({ folder: folderId }).populate('folder');

    if (!subtodos || subtodos.length === 0) {
      return res.status(404).json({ message: 'No subtodos found for this folder' });
    }
    res.status(200).json(subtodos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subtodo', error: error.message });
  }
};

// Get single subtodo by ID
const getSingleSubtodo = async (req, res) => {
  try {
    const subtodo = await Subtodo.findById(req.params.id).populate('folder');
    if (!subtodo) {
      return res.status(404).json({ message: 'Subtodo not found' });
    }
    res.status(200).json(subtodo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subtodo', error: error.message });
  }
};

// Update subtodo
const updateSubtodo = async (req, res) => {
  try {
    const updatedSubtodo = await Subtodo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSubtodo) {
      return res.status(404).json({ message: 'Subtodo not found' });
    }
    res.status(200).json(updatedSubtodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subtodo', error: error.message });
  }
};

// Delete subtodo
const deleteSubtodo = async (req, res) => {
  try {
    const deletedSubtodo = await Subtodo.findByIdAndDelete(req.params.id);
    if (!deletedSubtodo) {
      return res.status(404).json({ message: 'Subtodo not found' });
    }
    res. status(200).json({ message: 'Subtodo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subtodo', error: error.message });
  }
};

module.exports = {
  createSubtodo,
  getAllSubtodos,
  getSubtodosByFolder,
  getSingleSubtodo,
  updateSubtodo,
  deleteSubtodo,
};
