const mongoose = require('mongoose');

const subtodoSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
     description: String,
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['pending', 'in progress', 'completed'],
    default: 'pending',
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TodoFolder',  // Link to the parent folder
    required: true,
  },
});

module.exports = mongoose.model('SubTodo', subtodoSchema);
