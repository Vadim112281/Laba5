const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: String,
  room: Number,
  computer: String
});

module.exports = mongoose.model('Employee', employeeSchema);
