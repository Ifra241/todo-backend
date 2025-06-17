const mongoose = require('mongoose');
const User = require('./User');

const todoFolderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],  // priority sirf in values mein se hogi
    default: 'Medium',
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
user:{
  type: mongoose.Schema.Types.ObjectId,
  ref:'User',
  required:true

}
 
});

module.exports = mongoose.model('TodoFolder', todoFolderSchema );
